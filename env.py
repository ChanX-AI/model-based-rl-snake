class Grid:
    def __init__(self, size=(20, 20), start=(0, 0), goal=(18, 18), blocks=[]):
        self.size = size
        self.start = start
        self.goal = goal
        self.blocks = blocks
        self.state_space = self._state_space()
        self.action_space = self._action_space()
        self.state_space_n = size
        self.action_space_n = len(self.action_space)

    def _state_space(self):
        states = []

        for i in range(self.size[0]):
            for j in range(self.size[1]):
                states.append((i, j))
            
        return states
    
    def _action_space(self):
        return ["R", "D", "L", "U"]

    def reset(self):
        self.state = self.start

        return self.state

    def simulate(self, state, action):
        next_state = list(state)
        
        if action == "U":
            next_state[0] = state[0] - 1
        elif action == "R":
            next_state[1] = state[1] + 1
        elif action == "D":
            next_state[0] = state[0] + 1
        elif action == "L":
            next_state[1] = state[1] - 1

        # next_state[0] = min(next_state[0], self.size[0] - 1)
        # next_state[1] = min(next_state[1], self.size[1] - 1)

        # next_state[0] = max(next_state[0], 0)
        # next_state[1] = max(next_state[1], 0)

        next_state = tuple(next_state)
        reward = -0.05 * (abs(self.goal[0] - self.start[0]) + abs(self.goal[1] - self.start[1]))
        done = False

        if next_state in self.blocks:
            reward = -10
            done = True
        elif (
                next_state[0] < 0 or
                next_state[0] >= self.size[0] or
                next_state[1] < 0 or
                next_state[1] >= self.size[1]
             ):
            reward = -10
            done = True
        elif next_state == self.goal:
            reward = 10
            done = True
        

        return next_state, reward, done

    def step(self, action):
        next_state, reward, done = self.simulate(self.state, action)
        self.state = next_state

        return next_state, reward, done