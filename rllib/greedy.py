import numpy as np

def greedy_policy(env, state_values, gamma):
    policy = np.empty(env.size, dtype='U1')

    for s in env.state_space:
        max_Qsa = float('-inf')
        best_action = None

        for a in env.action_space:
            next_state, reward, done = env.simulate(s, a)
            
            if not done:
                Qsa = reward + gamma * state_values[next_state]
            else:
                Qsa = reward
            
            if Qsa > max_Qsa:
                max_Qsa = Qsa
                best_action = a

        policy[s] = best_action

    return policy

