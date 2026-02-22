class Grid:
    def __init__(self, size=(20, 20), start=(0, 0), goal=(18, 18), blocks=[]):
        self.size = size
        self.start = start
        self.goal = goal
        self.blocks = blocks
        self.ACTIONS = ["RIGHT", "DOWN", "LEFT", "UP"]

    def reset(self):
        self.state = self.start

        return self.state

    def simulate(self, state, action):
        next_state = list(state)
        
        if action == "UP":
            next_state[0] = state[0] - 1
        elif action == "RIGHT":
            next_state[1] = state[1] + 1
        elif action == "DOWN":
            next_state[0] = state[0] + 1
        elif action == "LEFT":
            next_state[1] = state[1] - 1
        # elif action == "STAY":
        #     pass

        next_state[0] = min(next_state[0], self.size[0] - 1)
        next_state[1] = min(next_state[1], self.size[1] - 1)

        next_state[0] = max(next_state[0], 0)
        next_state[1] = max(next_state[1], 0)

        next_state = tuple(next_state)

        reward = (10 if next_state == self.goal else -1)

        if next_state in self.blocks:
            reward = -10
        
        done = (reward == 10)

        return next_state, reward, done

    def step(self, action):
        next_state, reward, done = self.simulate(self.state, action)
        self.state = next_state

        return next_state, reward, done