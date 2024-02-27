<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
          <UserProfileWrite @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserProfilePosts :posts="posts" />
        </div>
      </div>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileWrite from '@/components/UserProfileWrite.vue';
import { reactive } from 'vue';

export default {
    name: "UserProfileView",
    components: {
     ContentBase,
     UserProfileInfo,
     UserProfilePosts,
     UserProfileWrite
    },

    setup: () => {
      const user = reactive({
        id: 1,
        username: "huansongliu",
        lastName: "liu",
        firstName: "huansong",
        followcount: 0,
        is_followed: false,
      });

      const posts = reactive({
        count: 3,
        posts: [
          {
            id: 1,
            userId: 1,
            content: "牢大"
          },
          {
            id: 2,
            userId: 1,
            content: "我们想你啦"
          },
          {
            id: 3,
            userId: 1,
            content: "孩子们我回来了"
          },
        ]
      });

      const follow = () => {
        if (user.is_followed) return;
        user.is_followed = true;
        user.followcount ++;
      };

      const unfollow = () => {
        if (!user.is_followed) return;
        user.is_followed = false;
        user.followcount --;
      };

      const post_a_post = (content) => {
        posts.count++;
        posts.posts.unshift({
          id: posts.count,
          userId: 1,
          content: content,
        })
      };

      return {
        user,
        posts,
        follow,
        unfollow,
        post_a_post,
      }
    }
}
</script>

<style scoped>

</style>