import numpy as np

class PolicyIteration:
    def __init__(self, env, theta=1e-6, gamma=0.9):
        self.env = env
        self.theta = theta
        self.gamma = gamma

    def run(self):
        pass