<template>
  <!-- 全件取得でDBの表示 -->
  <div>
    <h3>usersテーブル</h3>
    <table v-if="allUsers.length > 0">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in allUsers" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.name }}</td>
          <td>{{ record.email }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Can't get data from users table.</p>
  </div>

  <!-- 名前検索 -->
  <div>
    <h3>名前検索</h3>
    <div>
        <input
            v-model="searchWord"
            placeholder="名前を検索したい文字を入力してください"
        />
        <button @click="GetByName()">検索</button>
    </div>
    <table v-if="usersSearchByName.length > 0">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in usersSearchByName" :key="record.id">
          <td>{{ record.id }}</td>
          <td>{{ record.name }}</td>
          <td>{{ record.email }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Didn't hit the name or some error occured.</p>
  </div>

  <!-- ID検索・更新・削除 -->
  <div>
    <h3>ID検索・更新・削除</h3>
    <div>
        <input
            v-model="searchId"
            placeholder="検索したいIDを入力してください"
            type="number"
        />
        <input
            v-model="updateName"
            placeholder="更新後の名前を入力してください"
        />
        <div>
            <button @click="GetById()">検索</button>
            <button @click="PuostAndGet(false)">更新</button>
            <button @click="Delete()">削除</button>
        </div>
    </div>
    <table v-if="userSearchById !== undefined">
        <tr>
            <th>id</th>
            <td>{{ userSearchById.id }}</td>
        </tr>
        <tr>
            <th>name</th>
            <td>{{ userSearchById.name }}</td>
        </tr>
        <tr>
            <th>email</th>
            <td>{{ userSearchById.email }}</td>
        </tr>
    </table>
    <p v-else>Please search User by ID.</p>
  </div>

  <!-- 新規作成 -->
  <div>
    <input
        v-model="createName"
        placeholder="ex) Mine Aomori"
    />
    <button @click="PuostAndGet(true)">作成</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { User } from "../api/usersClient";
import {
  GetUsers,
  GetUserById,
  PostUser,
  PutUser,
  DeleteUser,
} from "../api/usersClient";


// API利用
const allUsers = ref<User[]>([]);
const usersSearchByName = ref<User[]>([]);
const userSearchById = ref<User>();

const searchWord = ref<string>("");
const searchId   = ref<number>();
const updateName = ref<string>("");
const createName = ref<string>("");

async function GetByName() {
    usersSearchByName.value = await GetUsers(searchWord.value);
}

async function GetById() {
    userSearchById.value = await GetUserById(searchId.value ?? 0)
}

async function PuostAndGet(isPost: boolean) {
    if(isPost === true) {
        await PostUser(createName.value);
        createName.value = "";
    } else {
        userSearchById.value = await PutUser(searchId.value ?? 0, updateName.value);
        searchId.value = userSearchById.value.id;
        updateName.value = "";
    }
    allUsers.value = await GetUsers();
}

async function Delete() {
    await DeleteUser(searchId.value ?? 0);
    allUsers.value = await GetUsers();
}

onMounted(async () => {
  allUsers.value = await GetUsers();
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
