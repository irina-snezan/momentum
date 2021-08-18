// import { a, fn } from './slider.js';
import * as fileService from './slider.js';

document.addEventListener('click', function () {
	fileService.fn();
	console.log(fileService.a);

	// fn();
	// console.log(a);
});