import numpy as np
from flask import Flask, render_template, jsonify, request
from env import Grid

def value_iteration(env, epochs=100, gamma=0.5, theta=1e-6):
    state_values = np.zeros(env.size)
    policy = np.zeros(env.size, dtype='U1')

    for _ in range(epochs):
        V = np.copy(state_values)
        for row in range(env.size[0]):
            for col in range(env.size[1]):
                s = (row, col)
                Q_val = {}
                max_Qsa = -float('inf')
                for a in env.ACTIONS:
                    next_state, reward, _ = env.simulate(s, a)
                    Qsa = reward + gamma * V[next_state]
                    Q_val[a] = Qsa
                    max_Qsa = max(max_Qsa, Qsa)
                state_values[s] = max_Qsa
                policy[s] = max(Q_val, key=Q_val.get)

    
    return state_values, policy

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def setEnv():
    data = request.get_json()
    size = data['size']
    start = data['start']
    goal = data['goal']
    blocks_dict = data['blocks']
    blocks = []
    for block in blocks_dict:
        blocks.append((block['y'], block['x']))
    env = Grid(
        size = (int(size[0]), int(size[1])),
        start = (int(start[0]), int(start[1])),
        goal = (int(goal[0]), int(goal[1])),
        blocks = blocks
    )

    _, policy = value_iteration(env)
    # for i in policy:
    #     for j in i:
    #         print(j, end=" ")
    #     print()
    # print("----------------------------------------------------------------")
    return {"policy": policy.tolist()}



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)