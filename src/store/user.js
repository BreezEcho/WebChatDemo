import $ from 'jquery'
import { jwtDecode } from 'jwt-decode';

// 对象组件
const ModuleUser = {
  state: {  //节点信息格式定义
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {  // 很多地方都采用了函数属性简写：update: () => {}  --->  update() {}
        state.id = user.id;
        state.username = user.username;
        state.photo = user.photo;
        state.followerCount = user.followerCount;
        state.access = user.access;
        state.refresh = user.refresh;
        state.is_login = user.is_login;
    },
    
    updateAccess(state, access) {
        state.access = access;
    },
    logout(state) {
        state.id = "";
        state.username = "";
        state.photo = "";
        state.followerCount = 0;
        state.access = "";
        state.refresh = "";
        state.is_login = false;
    }
  },
  actions: {
    login(context, data) {
        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/api/token/', // 向服务器申请jwt
            type: "POST",
            data: {
                username: data.username,
                password: data.password
            },
            success(resp) {  
                const {access, refresh} = resp;  // dom对象结构
                const access_obj = jwtDecode(access);  // 使用jwt_decode对令牌进行解码

                setInterval(() => {  // 周期性刷新用户令牌
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                        type: "POST",
                        data: {
                            refresh,
                        },
                        success(resp) {
                            context.commit('updateAccess', resp.access);
                        }
                    })
                }, 4.5 * 60 * 1000);

                // 如果登陆成功，就更新前端用户信息参数
                $.ajax({
                    url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                    type: "GET",
                    data: {
                        user_id: access_obj.user_id,  // 使用解码得出对象的属性
                    },
                    headers: {  // 针对已授权的api
                        'Authorization': "Bearer " + access,
                    },
                    success(resp) {
                        context.commit("updateUser", {
                            ...resp,
                            access: access,
                            refresh: refresh,
                            is_login: true,
                        })
                        data.success();
                    }
                })
            },

            error() {
                data.error();
            }
        });
    },
  },
  modules: {
  }
};


export default ModuleUser;