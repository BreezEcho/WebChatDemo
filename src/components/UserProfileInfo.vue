<template>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-3 img-field">
                <img class="fluid" src="https://avatars.githubusercontent.com/u/112888355?v=4" alt="">
            </div>

            <div class="col-9">
                <div class="username">{{ fullName }}</div>
                <div class="fans">粉丝数: {{ user.followcount }}</div>
                <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm">加关注</button>
                <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'UserProfileInfo',
    props: {  // 父组件向子组件传递的数据对象, 实际是对props的解构
        user: {
            type: Object,
            required: true,
        },
    },
    setup: (props, context) => {
        let fullName=computed(() => props.user.lastName+''+props.user.firstName);  // compute对接收的参数进行处理

        const follow = () => {
            context.emit('follow');
        };

        const unfollow = () => {
            context.emit("unfollow");
        }

        return {
            fullName,
            follow,
            unfollow,
        }
    }
}
</script>

<style scoped>
img {
    border-radius: 50%;
}

.username {
    font-weight: bold;
}

.fans {
    font-size: 12px;
    color: gray;
}

.img-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>