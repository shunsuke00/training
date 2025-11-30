const BASE_URL = "http://localhost:3000";
const TABLE = "users";
const URI = `${BASE_URL}/${TABLE}`;

export interface User {
    id: number,
    name: string,
    email: string,
}

// fetchでHTTPリクエストを送って、エラー処理、JSONへの変換を行う汎用関数
async function HttpRequest(path: string = "", options = {}) {
    const res: Response = await fetch(URI+path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    // errorの時は1行目でerr.messageの取得を試みて、2行目でエラーを投げる
    if(res.ok === false) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `API Error: ${res.status}`);
    }

    return await res.json().catch(() => ({}));
}

/* GET: users
---------------------------------------------------------------------------- */
export async function GetUsers(searchWord?: string) {
    const query = searchWord !== undefined
        ? `?searchWord=${encodeURIComponent(searchWord)}`
        : "";

    const resBody: User[] = await HttpRequest(query);
    return resBody;
}

/* GET: users/:id
---------------------------------------------------------------------------- */
export async function GetUserById(id: number) {
    const resBody: User = await HttpRequest(`/${id}`);
    return resBody;
}

/* POST: users
---------------------------------------------------------------------------- */
export async function PostUser(name: string) {
    const resBody: User = await HttpRequest("", {
        method: "POST",
        body: JSON.stringify({ name: name }),
    });
    return resBody;
}

/* PUT: users/:id
---------------------------------------------------------------------------- */
export async function PutUser(id: number, name: string) {
    const resBody: User = await HttpRequest(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: name }),
    });
    return resBody;
}

/* DELETE: users/:id
---------------------------------------------------------------------------- */
export async function DeleteUser(id: number) {
    const resBody: Record<string, any> = await HttpRequest(`/${id}`, {
        method: "DELETE",
    });
    return resBody;
}