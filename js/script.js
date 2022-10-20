// funcion que sube el texto y las fija sobre el input correspondiente
var inputs = document.getElementsByClassName("input");

for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keyup", function () {
                if (this.value.length >= 1) {
                        this.nextElementSibling.classList.add("fijar");
                } else {
                        this.nextElementSibling.classList.remove("fijar");
                }
        });
}

