##WHAT

A test for a form and

| Name               | Email             |
| :----------------- | :---------------- |
| Feodor Vassilyev   | many@children.com |

##HOW

```
npm i
npm run dev
npm test

```

##WHAT NEXT

Optimize population. It is a long mess from a late evening.

TODO:
 - take the validation logic out in it's own utility lib
 - set up a user/input fields store to replace the entangled logic

##DETAILS

The tests in the packages are intended to be run outside of the project as
their logic belongs to the packages alone. Each package runs well wrapped
in a karma.conf.js

Given the flux architecture and the already tested components there is not much
more testing to be done as all the logic left is only related to coupling them
together

The project uses Vue & Vuex 2.0 ... sadly there is no documentation for it yet
and you need to trust my good intention for using Vue proper ;)
