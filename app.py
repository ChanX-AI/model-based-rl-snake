from flask import Flask, render_template, request
from rllib import ValueIteration, greedy_policy
from env import Grid

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def init_env():   
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

    vi = ValueIteration(env, gamma=0.65)
    state_values = vi.run()
    policy = greedy_policy(env, state_values, gamma=0.65)


    return {
        "policy": policy.tolist(),
        "values": state_values.tolist()
    }



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)