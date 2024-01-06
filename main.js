document.addEventListener("DOMContentLoaded", function () {
    const questionArrows = document.querySelectorAll(".question-arrow");

    questionArrows.forEach(function (arrow) {
        arrow.addEventListener("click", function () {
            const questionBox = this.closest(".question-box");

            // Находим следующий элемент с классом "answers-to-additional-questions"
            const answersBox = questionBox.nextElementSibling;

            if (answersBox.style.display === "block") {
                answersBox.style.display = "none";
            } else {
                answersBox.style.display = "block";
            }
        });
    });
});

class FormField {
        constructor (name, placeholder, required, validate) {
        this.name = name;
        this.placeholder = placeholder;
        this.required = required;
        this.validate = validate;

        return this;
    }
}

class FormBuilder {
    
    constructor (fields, onSubmit) {
        this.fields = fields;
        this.onSubmit = onSubmit;

        this.values = {};
        this.inputs = {};

        this.generateFormValues();

    }

    generateFormValues () {
        this.values = {};

        for(const field of this.fields) {
            this.values[field.name] = "";
        }

        return this.values;
    }

    render (perent) {
        this.inputs = {};

        const form = document.createElement("form");
        form.classList.add("my-form");

        for (const field of this.fields) {
            const input = document.createElement("input");

            const {placeholder, name, required} = field;

            this.inputs[name] = input;

            if (required) {
                input.placeholder = placeholder.concat(" *");
            } else {
                input.placeholder = placeholder;
            }
            input.name = name;

            form.appendChild(input);
        }
    
        const formButton = document.querySelector(".feedback-button");
        const checkbox = document.querySelector (".checkbox");

        formButton.addEventListener("click", () => {
            if (checkbox.checked) {
                this.submit();
            } else {
                alert("Потрібно підтвердити умови використання.");
                return;
            }
        });

        perent.appendChild(form);
    }

    submit () {
        for (const name in this.inputs) {
            const inputValue = this.inputs[name].value;

            if (this.fields.find(field => field.name === name && field.required && inputValue.trim() === "")) {
                alert(`Поле "${name}" є обов'язковим і не може бути порожнім.`);
                return;
            };

            this.values[name] = inputValue;
        }

        this.onSubmit(this.values)

        for (const name in this.inputs) {
            this.inputs[name].value = "";
        }
    }

    showFormData () {
        console.log(this.fields);
    }
}

const nameField = new FormField("Name", "Ваше ім'я: Козейчук Едуард" , true);
const emailField = new FormField("email", "E-mail: procombiz@gmail.com", true);
const phoneField = new FormField("Phone number", "+380000000000", true);

// Массив полей для FormBuilder
const fields = [nameField, emailField, phoneField];

const formBuilder = new FormBuilder(fields, onSubmitCallback);

const parentElement = document.querySelector(".feedback-box-input");

formBuilder.render(parentElement);

function onSubmitCallback(values) {
    console.log("Form submitted with values:", values);
}
