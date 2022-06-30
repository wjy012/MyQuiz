**接口约定文档**

根路径：http://localhost:8080



***user模块***

**登录**

​	**url：**/api/users/login

​	**请求成功：**

​		状态码：200



​	**请求失败：**

​		状态码：400

​		返回示例：

​			`{"msg":"user dont exist!"}`

​			`{"msg":"wrong password!"}`

**注册**

​	**url：**api/users/register

​	**请求成功：**

​		状态码：200

​		返回示例：

					{ 
						"name": "junyi",
						"email": "test@126.com",
						"password": "$2b$10$NxQPK2pmVINzEUm3Rtj9euOb3PSUbWP9vsoeF5mPsJW7vpgdmiFeK",
						"avadar": "",
	 					"_id": "62bd0ca67960a83ebc963ac8",
						"__v": 0
					}

​	**请求失败：**

​		状态码：400

​		返回示例：

​				`{ "msg": "邮箱已被注册"}`