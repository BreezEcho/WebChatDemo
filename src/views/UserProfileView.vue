<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
          <UserProfileWrite v-if="is_me" @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserProfilePosts :is_me="is_me" :posts="posts" @delete_a_post="delete_a_post" />
        </div>
      </div>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileWrite from '@/components/UserProfileWrite.vue';
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    name: "UserProfileView",
    components: {
     ContentBase,
     UserProfileInfo,
     UserProfilePosts,
     UserProfileWrite
    },

    setup: () => {
      const route = useRoute();
      const store = useStore();

      const userId = parseInt(route.params.userId);
      const user = reactive({});

      const posts = reactive({});

      // 通过服务器更新user
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type: "GET",
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp) {
          user.id = resp.id;
          user.username = resp.username;
          user.photo = resp.photo;
          user.followerCount = resp.followerCount;
          user.is_followed = resp.is_followed;
        }
      });

      // 通过服务器更新posts
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "GET",
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp) {
          posts.count = resp.length;  // 获得帖子列表里的元素个数
          posts.posts = resp;
        }
      });

      const follow = () => {
        if (user.is_followed) return;
        user.is_followed = true;
        user.followerCount ++;
      };

      const unfollow = () => {
        if (!user.is_followed) return;
        user.is_followed = false;
        user.followerCount --;
      };

      const post_a_post = (content) => {
        posts.count++;
        posts.posts.unshift({
          id: posts.count,
          userId: userId,
          content: content,
        })
      };

      const delete_a_post = post_id => {
        posts.posts = posts.posts.filter(post => post.id != post_id);
        posts.count = posts.posts.length;  // posts.count-- ?
      }

      const is_me = computed(() => userId === store.state.user.id);  // computed内置一个操作，返回操作结果

      return {
        user,
        posts,
        is_me,
        follow,
        unfollow,
        post_a_post,
        delete_a_post,
      }
    }
}
</script>

<style scoped>

</style>