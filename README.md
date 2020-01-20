# Puzzled

### A RESTful API that provides sliding puzzle solving services

## API

### GET /sliding-puzzle/solve

#### REQUEST

| Field Name | Is Required | Data Type | Description | Examples |
|------------|-------------|-----------|-------------------------------------------------------------------|-----------------|
| method | Yes | String | The searching method which is to be used to search the goal state | "astar", "bfs", or "dfs" |
| puzzle | Yes | String | The initial state of the search | "[[1,2,3],[4,5,6],[7,0,8]]" (space insensitive) |
| size | Yes | Number | The size of initial state | 3 |

#### Example

```
{
    "method": "astar",
    "puzzle": "[[1,2,3],[4,5,6],[7,0,8]]",
    "size": 3
}
```

#### RESPONSE

| Field Name | Data Type | Description | Examples |
|------------|-----------|-------------------------------------------------------------------|-----------------|
| able_to_solve | Boolean | Whether the input puzzle is sovable | true or false |
| num_steps | Number | Number of steps takes to solve the input puzzle using selected searching method | 1 |
| steps | Array | The states that lead to solution | [[[1, 2, 3], [4, 5, 6], [7, 8, 0]]] |
| num_expanded | Number | Number of states that are expanded during the searching process | 1 |
| expanded | Array | The states which are expended during the searching process |  [[[1, 2, 3], [4, 5, 6], [7, 0, 8]]] |
| num_generated | Number | Number of states that are generated during the searching process | 3 |

#### Example

```
{
    "able_to_solve": true,
    "num_steps": 1,
    "steps": [
        [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    ],
    "num_expanded": 1,
    "expanded": [
        [[1, 2, 3], [4, 5, 6], [7, 0, 8]]
    ],
    "num_generated": 3
}
```
