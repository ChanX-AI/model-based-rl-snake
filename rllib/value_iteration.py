import numpy as np

class ValueIteration:
    def __init__(self, env, theta=1e-6, gamma=0.9):
        self.env = env
        self.theta = theta
        self.gamma = gamma

    def run(self):
        state_values = np.zeros(self.env.state_space_n)
        delta = float('inf')

        while delta > self.theta:
            delta = 0

            for s in self.env.state_space:
                Vs = state_values[s]
                max_Qsa = float('-inf')
                for a in self.env.action_space:
                    next_state, reward, done = self.env.simulate(s, a)
                    if not done:
                        Qsa = reward + self.gamma * state_values[next_state]
                    else:
                        Qsa = reward
                    max_Qsa = max(max_Qsa, Qsa)

                state_values[s] = max_Qsa
                delta = max(delta, abs(max_Qsa - Vs))

        return state_values


    