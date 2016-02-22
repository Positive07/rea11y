Sliders
=======

Slider
------

```jsx
import {Slider} from 'rea11y';

function handleChange(value) {}
function makeText({value}) {
	return value;
}

<Slider
	min={0}
	max={100}
	value={42}
	step={1}
	bigStep={10}
	text={makeText}
	onChange={handleChange}
/>
```

Range slider
------------

```jsx
import {RangeSlider} from 'rea11y';

function handleChange(upperValue, lowerValue) {}

<RangeSlider
	min={0}
	max={100}
	lowerValue={24}
	upperValue={96}
	step={1}
	bigStep={10}
	text={makeText}
	onChange={handleChange}
/>
```