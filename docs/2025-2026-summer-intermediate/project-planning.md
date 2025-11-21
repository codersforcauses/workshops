# The Basics of Software Project Planning
> Presented By: Oscar Hermoso, Cloud Automation + DevOps Lead @ RAC

#### Why are we planning at all?

- Helps break down a large project into manageable pieces
- Helps prioritise important features (and deprioritise unnecessary ones)
- Enables your team to complete work in parallel

---

## Approach

Top-down approach:

1. Goals
2. Personas
3. User journey
4. Writing tickets
   1. Features
   2. Sub-tasks
   3. Bugs

Not strictly linear.

---

## Goals

What are you trying to achieve?

- Portfolio projects: want to showcase skills (needs to look good)
- Solving a problem: want to help users in some way

What is out of scope?

(Hint: For an MVP, don't worry about cybersecurity, performance, accessibility, etc.)

---

## Personas

Who are you building this for?

Common personas:

- Users
- Client (if applicable)
- Developers (you and your team)

---

## User Journey

Once you've identified personas, features naturally take a user story format:

> "As a [persona], I want [feature], so that [benefit]."

You should do some research here - look at similar applications.

Good to do some light wireframing here - sketch out the pages of your application.

---

## Writing Tickets

Recommend breaking down work into vertical slices (as explained below).

Alternatively, can break down tasks into horizontal layers first (frontend/backend/database), but this can lead to bottlenecks.

### Features

Normally 1 user story per feature ticket, but may occasionally have a few user stories per feature.

Define "Acceptance Criteria" for each ticket. Example format:

> - MUST be able to [action]
> - MUST NOT be able to [action]
> - SHOULD have tests

### Sub-tasks

- UX/UI Design (Figma, etc)
- Frontend Implementation
- Backend APIs
- Database Modelling
- Deployment

### Bugs

Take the format:

> Steps to reproduce:
> 1. [Step one]
> 2. [Step two]
> ...
>
> Expected result:
> [What you expected to happen]
>
> Actual result:
> [What actually happened]
>
> Extra info:
> [Browser, error logs, etc]

---

## Some parting advice

- Everything that I've said is advice, not rules
- Revisit your goals often
- Done is better than perfect
- AI is a trap for defining goals & requirements
