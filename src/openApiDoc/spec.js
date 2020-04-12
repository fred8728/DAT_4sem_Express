module.exports = {
  "openapi": "3.0.1",
  info: {
    version: '1.0.0',
    title: 'game',
    description: 'Simple Game API, meant for a FullStack JavaScript Course',
    "contact": {
      "name": "Lars Mortensen",
      "email": "lam@cphbusiness.dk"
    },
  },
  servers: [
    { url: "http://localhost:3333", description: "local dev server" }
  ],
  tags: [
    { name: 'Endpoints meant for Mobile Clients' },
    { name: "Endpoints meant for Campus Client App" }
  ],
  "paths": {
    "/api/firstUnsolvedPost/{team-id}": {
      "get": {
        "tags": [
          "Endpoints meant for Campus Client App"
        ],
        "summary": "Get first unsolved Post",
        "parameters": [
          {
            "name": "team-id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          '200': {
            description: "The first post with an unsolved problem is returned",
          },
          '400': {
            description: "No unsolved post found (Game Over",
          },
          "default": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/postForFirstUnsolvedPost"
                }
              }
            }
          }
        }
      }
    },
    "/api/idForFirstUnsolvedPost/{team-id}": {
      "get": {
        "tags": [
          "Endpoints meant for Mobile Clients"
        ],
        "summary": "Get id for first unsolved Post",
        "parameters": [
          {
            "name": "team-id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          '200': {
            description: "The first post with an unsolved problem is returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/IdAndStatusOutput"
                }
              }
            }
          },
          '400': {
            description: "No unsolved post found",
          },

        }
      }
    },
    "/taskForPostIfReached": {
      "get": {
        tags: ["Endpoints meant for Mobile Clients"],
        description: "Returns the task for the provided Post and Team, if the provided coordinates is inside the post",
        parameters: [],
        produces: [
          "application/json"
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InputForGetPost'
              }
            },
            required: true
          },
          required: true
        },
        responses: {
          '200': {
            description: "The first post with an unsolved problem is returned",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TaskForPost"
                }
              }
            }
          },
          '400': {
            description: "???",
          }
        }
      }   
    },
    "/api/nextPostGivenSolution/{team-id}/{solution}": {
      "get": {
        "tags": ["Endpoints meant for Campus Client App"],
        "summary": "Get next Post given the right solution",
        "parameters": [
          {
            "name": "team-id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "solution",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          '200': {
            description: "Next Post (if more) is returned, given the right answer",
          },
          '400': {
            description: "Error describing the problem",
          },
          "default": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostOutput"
                }
              }
            }
          }
        }
      }
    },
    "/addPost": {
      "post": {
        tags: ["Endpoints meant for admins"],
        description: "Creates a new Post. Return value mirrors what's in the database to visualize this",
        parameters: [],
        produces: ["application/json"],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostInput'
              }
            },
            required: true
          }
        },
        responses: {
          '200': {
            description: "The new post was added",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PostOutputMongo"
                }
              }
            }
          },
          '400': {
            description: "Error, post was not added",
          }
        }
      }
    },
    "/addTeam": {
      "post": {
        tags: ["Endpoints meant for admins"],
        description: "Creates a new Team (IMPORTANT: All post must be created first",
        parameters: [],
        produces: [
          "application/json"
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TeamInput'
              }
            },
            required: true
          }
        },
        responses: {
          '200': {
            description: "The new Team was added",
          },
          '400': {
            description: "Error, Team was not added",
          }
        }
      }
    },
  },
  "components": {
    "schemas": {
      "postForFirstUnsolvedPost": {

        "type": "object",
        properties: {
          postID: {
            type: "string",
            example: "Team-1"
          },
          status: {
            type: "boolean",
            example: false
          },
          longitude: {
            type: "number",
            example: 12.000
          },
          latitude: {
            type: "number",
            example: 56.000
          }
        }
      },
      "InputForGetPost": {
        "type": "object",
        properties: {
          postId: {
            type: "string",
            example: "Post-1",
            description: "ID for the post for which the task is required"
          },
          teamId: {
            type: "string",
            example: "Team-1",
            description: "Id for the team, requesting the task for the given Post"
          },
          longitude: {
            type: "number",
            example: 12.000,
            description: "Current longitude for the the provided Team",
          },
          latitude: {
            type: "number",
            example: 56.000,
            description: "Current latitude for the the provided Team",
          }
        }
      },
      "TaskForPost": {
        "type": "object",
        properties: {
          text: {
            type: "string",
            example: "What is 2+2 || http://Somewhere/task",
            description: "Either a plain task in text, or a URL pointing to a more complext task"
          },
          isURL: {
            type: "boolean",
            example: false,
            descript: "Indicates how to interpret the text property"
          }
        }
      },
      "IdAndStatusOutput": {
        "type": "object",
        properties: {
          postId: {
            type: "string",
            example: "Post-1"
          },
          status: {
            $ref: "#/components/schemas/PostStatus",
            example: "FOUND"
          },
        }
      },
      "PostOutput": {

        "type": "object",
        properties: {
          postID: {
            type: "string",
            example: "Team-1"
          },
          status: {
            $ref: "#/components/schemas/GameStatus",
            example: "RUNNING"
          },
          longitude: {
            type: "number",
            example: 12.000
          },
          latitude: {
            type: "number",
            example: 56.000
          }
        }
      },
      "PostOutputMongo": {

        "type": "object",
        properties: {
          _id: {
            type: "string",
            example: "Post-1"
          },
          task: {
            "type": "object",
            properties: {
              text: {
                type: "string",
                example: "2+2"
              },
              isURL: {
                type: "boolean",
                example: false
              }
            }
          },
          taskSolution: {
            type: "string",
            example: "4"
          },
          position: {
            type: "object",
            properties: {
              type: {
                "type": "string",
                "example": "Point"
              },
              coordinates: {
                "type": "array",
                "items": { "type": "number" },
                example: [12.000, 56.000]

              }
            }
          }

        }
      },
      "PostInput": {
        "type": "object",
        properties: {
          postID: {
            type: "string",
            example: "Post-1"
          },
          taskText: {
            type: "String",
            example: "What is the result of 2+4"
          },
          isURL: {
            type: "boolean"
          },
          taskSolution: {
            type: "string",
            example: "4"
          },
          lon: {
            type: "number",
            example: 12.000
          },
          lat: {
            type: "number",
            example: 56.000
          }
        }
      },
      "TeamInput": {
        "type": "object",
        properties: {
          teamID: {
            type: "string",
            example: "Team-1"
          },
          postsInOrder: {
            type: "array",
            items: { "type": "string" },
            example: ["Post-2", "Post-1", "Post-3"]
          }
        }
      },
      "GameStatus": {
        type: "string",
        enum: ["GAME_OVER", "RUNNING"]
      },
      "PostStatus": {
        type: "string",
        enum: ["FOUND", "NOT_YET_FOUND"]
      }
    }
  }
}