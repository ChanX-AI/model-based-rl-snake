import numpy as np

class PolicyIteration:
    def __init__(self, env, theta=1e-6, gamma=0.9):
        self.env = env
        self.theta = theta
        self.gamma = gamma

    def run(self):
        policy_stable = False
        # policy = np.random.choice(self.env.action_space, size=self.env.state_space_n)
        policy = np.empty(self.env.state_space_n, dtype="U1")
        state_values = None

        while not policy_stable:
            state_values = self._policy_evaluation(policy)
            policy_stable = self._policy_improvement(state_values, policy)

        return policy

    def _policy_evaluation(self, policy):
        state_values = np.zeros(self.env.state_space_n)
        delta = float('inf')

        while delta > self.theta:
            delta = 0

            for s in self.env.state_space:
                Vs = state_values[s]
                a = policy[s]
                next_state, reward, done = self.env.simulate(s, a)

                if not done:
                    Qsa = reward + self.gamma * state_values[next_state]
                else:
                    Qsa = reward

                state_values[s] = Qsa
                delta = max(delta, abs(Qsa - Vs))

        return state_values

    def _policy_improvement(self, state_values, policy):
        policy_stable = True

        for s in self.env.state_space:
            max_Qsa = float('-inf')
            best_action = None

            for a in self.env.action_space:
                next_state, reward, done = self.env.simulate(s, a)

                if not done:
                    Qsa = reward + self.gamma * state_values[next_state]
                else:
                    Qsa = reward

                if Qsa > max_Qsa:
                    max_Qsa = Qsa
                    best_action = a

            if (policy[s] != best_action):
                policy_stable = False

            policy[s] = best_action

        return policy_stable

