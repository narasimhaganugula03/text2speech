const voiceSelect = document.getElementById("voiceSelect");
const count = document.getElementById("count");

let voices = [];

function loadVoices() {

    voices = speechSynthesis.getVoices();

    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {

        const option = document.createElement("option");

        option.value = index;

        option.textContent =
            `${voice.name} (${voice.lang})`;

        voiceSelect.appendChild(option);

    });
}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;

document
.getElementById("text")
.addEventListener("input", function () {

    count.textContent =
        this.value.length + " Characters";

});

function speakText() {

    const text =
        document.getElementById("text").value;

    if (text.trim() === "") {
        alert("Please enter text.");
        return;
    }

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.voice =
        voices[voiceSelect.value];

    speech.rate = parseFloat(
        document.getElementById("rate").value
    );

    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);
}