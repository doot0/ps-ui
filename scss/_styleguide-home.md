# Pathship Component Library

> Currently maintained by [dave@pathship.com](mailto:dave@pathship.com)

If anything is missing from here or you're unsure of how to implement a given component, ping me on Slack: [<img style="border-radius:4px" width="24" src="https://avatars.slack-edge.com/2016-02-10/20898856694_78ce0d9d6e36739918e5_72.jpg"> @dave](https://pathship.slack.com/messages/@dave/)

#### Docs

###### Namespaces

Namespacing your styles is important. It provides instant feedback about what a
given classname does and what it is likely to affect.

- `a-` - Atomic style
- `o-` - Object
- `c-` - Component
- `i-` - Immutable
- `is-, has-` - Stateful (used for stateful styling)
- `js-` - JS binding (for targeting with JavaScript)

One added bonus you get from namespacing your classnames is that while you are
authoring your UI, most auto-complete features in editors will hint all classes
belonging to a given namespace.

An additional namespace you might like to add could be a theming namespace,
indicated by a `t-` prefix. A theme layer would be added after the component
layer.

###### Structure
The structure is as follows.

```
scss/
├─ atomics/
├─ base/
├─ components/
├─ config/
   ├─ _vars.scss
├─ generics/
├─ immutables/
├─ objects/
├─ utils/
├─ .scss-lint.yml
├─ app.scss
```

Included with this project is a `.scss-lint.yml` file for use with [scss-lint](https://github.com/brigade/scss-lint). You should distribute this file amongst your team and use `scss-lint` so you all write consistent styles.

###### Configuration
> `/configuration/*.scss` - *Variables 'n such*

You should place variables for your project in this folder. If you have lots of
sets of similar data, for example a colour palette, or margins/paddings, then
it's a good idea to define them as a map;

``` scss
$cfg-palette: (
  'primary': #2dd3d3,
  'negative': #b3343a,
  'positive': #5ada55
)
```

Maps in SCSS are iterable, which makes generating styles with an `@each`
possible. Accessing values by key using `map-get` is also good practice.

###### Utilities
> `/utils/*.scss` - *Mixins and functions that consume the configs*

Most of the mixins/functions that you write should help retrieve values from
your configuration files. Try and avoid writing a mixin if it exposes very
few styles. An [atomic](#atomics) would be better in that case.

###### Generics
> `/generics/*.scss` - *Resets & third party libs*

Generics have the possibility of imposing very
greedy styles and should be added as little as possible. A reset is perhaps
the only acceptable use case where far-reaching & greedy styles are acceptable.
Grid systems are also classed as a generic.

###### Base
> `/base/*.scss` - *Element styles e.g. h1, p, ul*

Base styles should also be used at a minimum, as most of your base element
styling should take place in your reset, with the exception of typography.
Attaching styles to base elements can severely reduce their re-usability.

###### Atomics
> `/atomics/*.scss` - *Atomic style classes, without the terseness*

*Namespace:* `a-`

This is where you should write classes that do one thing and one thing only.
It is a good idea to generate your atomics based on the contents of your
configuration files, using mixins & functions that you author in the utils
folder.

###### Objects
> `/objects/*.scss` - *Re-usable UI patterns*

*Namespace:* `o-`

Objects represent a repeatable UI pattern that should work in any given
context, regardless of its scope. You should author objects with immutability
and extensibility in mind. Once you have authored an object, you should never
modify the core styles related to it, as refactoring an object that is already
widely used will most likely cause unexpected behaviour.

An object should **never** rely on a [component](#components).

You should only extend an object using a BEM modifier
(`--` delimited classname). This way you can change the behaviour of an
object class without worrying about it affecting the base object.

###### Components
> `/components/*.scss` - *Bespoke UI implementations*

*Namespace:* `c-`

Components are bespoke, implementation-specific pieces of UI. In most cases,
you should use component classes to structure the layout of a given piece of
UI. Components can be used in conjunction with [atomics](#atomics) and
[objects](#objects) to add context-specific modifications.

Components may rely on objects for their composure.

An example:

``` html
<div class="o-avatar c-profile-avatar">
  This is a base avatar layout (.o-avatar) with additional modifications
  imposed by the component-specific implementation (.c-profile-avatar).
</div>
```

###### Immutables
> `/immutables/*.scss` - *Stuff with `!important` in it.*

*Namespace:* `i-`

It's pretty common knowledge that using `!important` is bad practice, as it
is a very ham-fisted way of ensuring that a property does exactly what you
want. There is however, one use-case for `!important` being acceptable, and
this is for proactive use, as opposed to reactive use.

An almost painfully simple example:

``` css
.i-hidden {
  display: none !important;
}
```

A class of `i-hidden` should absolutely hide the element you apply it to every
single time. This is an example of proactive usage of `!important`.

Regardless, you should keep usage of immutables to a minimum. There shouldn't
be too many use cases for immutables but they're important nonetheless.
