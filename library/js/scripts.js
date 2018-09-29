var fw = fw || {};
fw.events = fw.events || {};
fw.form = fw.form || {};
fw.animate = fw.animate || {};

$(function() {

	//FORM VALIDATION AND SUBMISSION
	if (document.getElementById('contactform')) {
		var form = document.getElementById('submitcontactform');
		fw.events.formValidateEvent(form);
	}
	
    //CONTENT ANIMATION
	fw.animate();
	window.addEventListener('scroll', fw.animate);
	
});
// Multi Step form
multiform = {
	config: {},
	init : function() {
		this.attactEvents();
	},
	attactEvents : function() {
		var _this = this;
		_this.formSteps();
	},
	formSteps : function() {
		var heightInput = document.getElementById('height');
		var weightInput = document.getElementById('weight');

		var nextButton = document.getElementById('next');
		var submitButton = document.getElementById('submit');

		var firstEntry = document.getElementById('entry-1');
		var secondEntry = document.getElementById('entry-2');
		var thirdEntry = document.getElementById('entry-3');
// Val
		weightVal = weightInput.value;
		heightVal = heightInput.value;
//  Input log
		weightInput.addEventListener('change', function() {
			weightVal = weightInput.value;
			console.log('weight: ' + weightInput.value);
		});
		heightInput.addEventListener('change', function() {
			var firstName = document.getElementById('firstName') ? document.getElementById('firstName').value : 'John';
			var lastName = document.getElementById('lastName') ? document.getElementById('lastName').value : 'Doe';
			heightVal = heightInput.value;
			console.log('height: ' + heightInput.value);
			console.log('//////////////////////////********************');
			var bmiVal = weightInput.value / (heightInput.value * heightInput.value);
			console.log(bmiVal.toFixed(2)); // toFixed can manipulate the Decimal Placing
			var bmiContainer = document.getElementById('bmiContainer');
			bmiContainer.classList.remove('hidden');
			bmiContainer.innerHTML += '<p>' +  'Dear ' + firstName + ' ' + lastName + ', ' + ' your BMI Score is: ' + '</p>' + '<h2>' + bmiVal.toFixed(2) + '</h2>' + '<a href="" class="btn btn--alt">Find out more</a>';

			if(bmiVal >= 18 && bmiVal <= 24) {
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Healthy</p>' + '</div>';
			} else if(bmiVal >= 12 && bmiVal <= 17) {
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Underweight</p>' + '</div>';
			} else if(bmiVal >= 24 && bmiVal <= 29) { 
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Overweight</p>' + '</div>';
			} else if(bmiVal >= 29 && bmiVal <= 39) {
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Obese</p>' + '</div>';
			} else if (bmiVal >= 39) {
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Extremely Obese</p>' + '</div>';
			} else {
				bmiContainer.innerHTML += '<div class="c__form__contain__content__result" ' + '<p>Verdict: Unknown</p>' + '</div>';
			}
		});
		nextButton.addEventListener('click', function() {
// Progress Bar
			var firstItem = document.getElementsByClassName('item_1');
			var secondItem = document.getElementsByClassName('item_2');

			firstEntry.classList.add('hidden');
			secondEntry.classList.remove('hidden');

			firstItem.classList.remove('active');
			secondItem.classList.add('active');
		});
	}
};
multiform.init();
//Add global event listeners to the events object
fw.events = {
    formValidateEvent: function (el) {
        el.addEventListener('click', function(e) {
			e.preventDefault();
			if (fw.form.validateForm(form)) {
				console.log('Valid form');
			}
		});
    }
};

fw.form.validateForm = function (form) {
	$('.validate-error-l__row').remove();
	var valItems = $('[data-required="true"]'),
		formValid = true;
	function insertValidation(el, msg) {
		var er = document.createElement('span');
		er.className = "validate-error-l__row";
		er.innerHTML = msg;
		$(er.outerHTML).insertAfter(el);	
	}
	for (var i = 0, valItem; !!(valItem = valItems[i++]);) {
		var node = valItem.nodeName,
			valid = true,
			msg;
		if (node === "INPUT") {
			if (valItem.getAttribute('type') != "email") {
				if (valItem.getAttribute('type') == "text") {
					valid = valItem.value.length < 1 ? false: valid;
					msg = "Please enter a value";
				} else if (valItem.getAttribute('type') == "file") {
					valid = valItem.value.length < 1 ? false: valid;
					msg = "Please select a file";
				} else if (valItem.getAttribute('type') == "checkbox") {
					valid = !valItem.checked ? false : valid;
					msg = "You must select this option";	
				}
			} else {
				valid = valItem.value.length < 1 ? false: valid;
				msg = "Please enter a value";
				if (valid) {
					var emReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  					valid = !emReg.test(valItem.value) ? false : valid;
					msg = "Please enter a valid email";
				}	
			}
		} else if (node === "SELECT") {
			valid = valItem.value === 0 ? false: valid;
			msg = "Please select from one of the options";
		} else if (node === "TEXTAREA") {
			valid = valItem.value.length < 1 ? false: valid;
			msg = "Please enter a value";	
		}
		if (!valid) {
			insertValidation(valItem, msg);
			formValid = false;
		}	
	}
	return formValid;
};

fw.animate = function () {
	var animationItem = document.querySelectorAll('[data-anim__scroll]'),
        doc = document.documentElement;
    for (var i = 0, item; !!(item = animationItem[i++]);) {
        var itemPosTop = item.getBoundingClientRect();
        if (itemPosTop.bottom > 100 && itemPosTop.top < (window.innerHeight || doc.clientHeight) - 50) {
            item.setAttribute('data-anim__animate', true);
        }
    }
};