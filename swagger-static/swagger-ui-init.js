
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/users": {
        "post": {
          "operationId": "UsersController_create",
          "summary": "",
          "description": "Create a new user.",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Created. The user has been successfully created.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ]
        },
        "get": {
          "operationId": "UsersController_findAll",
          "summary": "",
          "description": "Fetch all users.",
          "parameters": [],
          "responses": {
            "200": {
              "description": "OK. The users have been successfully fetched.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/UserEntity"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ]
        }
      },
      "/users/{id}": {
        "get": {
          "operationId": "UsersController_findOne",
          "summary": "",
          "description": "Fetch one user.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK. The user has been successfully fetched.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ]
        },
        "patch": {
          "operationId": "UsersController_update",
          "summary": "",
          "description": "Update one user.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK. The user has been successfully updated.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ]
        },
        "delete": {
          "operationId": "UsersController_remove",
          "summary": "",
          "description": "Delete one user.",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK. The user has been successfully deleted.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "users"
          ]
        }
      }
    },
    "info": {
      "title": "Node + Nest + TypeScript starter project API",
      "description": "Basic User API generated with @nestjs/swagger",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "users",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email."
            },
            "name": {
              "type": "string",
              "description": "User name."
            },
            "phone": {
              "type": "string",
              "description": "User phone number."
            }
          },
          "required": [
            "email",
            "name"
          ]
        },
        "UserEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "User id in database."
            },
            "email": {
              "type": "string",
              "description": "User email."
            },
            "name": {
              "type": "string",
              "description": "User name."
            },
            "phone": {
              "type": "string",
              "description": "User phone number.",
              "nullable": true
            }
          },
          "required": [
            "id",
            "email",
            "name",
            "phone"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "User email."
            },
            "name": {
              "type": "string",
              "description": "User name."
            },
            "phone": {
              "type": "string",
              "description": "User phone number."
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
