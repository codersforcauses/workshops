# The Basics of Software Project Planning

What are we trying to produce by planning?

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

## Goals

What are you trying to achieve?

What is out of scope?

(Hint: For an MVP, don't worry about cybersecurity, performance, accessibility, etc.)

## Personas

Who are you building this for?

Common personas:

- End User (can be broken down further)
  - Consider authenitcated, unauthenticated
- Product Owner
- Developer (you)

## User Journey

Once you've naturally take a user story format:

> "As a [persona], I want [feature], so that [benefit]."

You should do some research here - look at similar applications.

Good to do some light wireframing here - sketch out the main screens of your application. Design for mobile first.

## Writing tickets

Historically, CFC split work horizontally:

- UX/UI Design
- DB Modeling
- Frontend Implementation
- Backend APIs
- Integration
- Deployment

Can either break down work vertically (one user story at a time) or horizontally (one layer at a time).

Strongly recommend vertical breakdown.

### Features

Starting to think about implementation.

Normally 1 user story per feature ticket, but may occasionally have a few user stories per feature.

Define "Acceptance Criteria" for each ticket. Example format:

> - MUST be able to [action]
> - MUST NOT be able to [action]
> - SHOULD have tests

### Sub-tasks

### Bugs

Can break down feature tickets into sub-tasks to allow for parallel work.


Oscar recommends breaking down vertically:

- One person does all parts for a single user story

Tips:

Don't put too much detail into tickets - just enough to get started.

Tickets are flexible - can be updated as you go. Feel free to add more tickets as needed.

## Drawing entity relationship diagrams (ERDs)

I don't do this. Easier to just start coding and refactor as needed.

## Some parting advice

- Revisit your goals often
- Everything that I've said is advice, not rules
- Done is better than perfect
- Rework is cheap
- AI is a trap for defining goals & requirements
