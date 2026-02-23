<<<<<<< HEAD
# tes
=======
# Model-Based Reinforcement Learning Snake (Value Iteration)

This project implements a **Snake game controlled by a Value Iteration agent**, built to deeply understand **model-based reinforcement learning**,

The Snake environment is implemented in **JavaScript**, while the RL agent in **Python**. The agent recomputes state values online and selects actions greedily based on current value function

---

## Motivation

The goal of the project is **learning, not performance**

Instead of using Q-learning or deep RL, I used **Value Iteration online at every step** to gain a practical and intuitive understanding of:
  - Bellman optimality updates
  - Value convergance
  - Computational cost of model-based RL

---

## Environment Design

The snake grid is modeled as a **Markov Decision Process (MDP)**

- **States**:
    - Food
    - Empty Cell
    - Snake Cell
 
- **Actions**:
    -Up, Down, Left, Right
  
- **Rewards**:
  - +10 for food
  - -10 for collision
  - -1 step penalty
 
- **Transitions**:
    - Deterministic state transitions based on Snake movement
 

  ---

  ## Algorithm Used : Value Iteration

  At each step:

  1. Value Iteration is performed using the Bellman optimality equation
  2. State values are updated until convergence
  3. The agent selects the greedy action based on the updated value function

  **Note : I used discount-factor, gamma as 0.5 to make the agent short sighted**

  ---

  ## Why This Is Slow

  This project computes value functions at every agent step over the entire state space. This makes the agent computationally slow, especially with asynchronous                communication between JavaScript and Flask


>>>>>>> b0e0aadeebb2a7e13311b8d32f3376679c87cf19
