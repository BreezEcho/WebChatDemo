<template>
    <ContentBase>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">UserName</label>
              <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">confirmPassword</label>
              <input v-model="password_confirm" type="password" class="form-control" id="password">
            </div>
            <div class="error-message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary" @click="register">Submit</button>
          </form>
        </div>
      </div>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import router from '@/router';
import {ref} from 'vue';
import $ from 'jquery';

export default {
    name: 'RegisterView',
    components: {
     ContentBase
    },
    setup: () => {
      let username = ref('');
      let password = ref('');
      let password_confirm = ref('');
      let error_message = ref('');

      const register = () => {  // 登陆事件
        error_message.value = "";
        $.ajax({
          url: "https://app165.acapp.acwing.com.cn/myspace/user/",
          type: "POST",
          data: {
            username: username.value,
            password: password.value,
            password_confirm: password_confirm.value,
          },
          success(resp) {
            if (resp.result === "success") {
              router.push({name: 'userlist'});
            }

            else {
              error_message.value = resp.result;
            }
          }
        })
      };

      return {
        username,
        password,
        password_confirm,
        error_message,
        register,
      }
    }
}
</script>

<style scoped>
button {
  width: 100%;
}

.error-message {
  color: red;
}
</style>