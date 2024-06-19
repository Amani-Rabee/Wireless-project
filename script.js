// JavaScript function to scroll to sections
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        // Calculate the offset of the section relative to the document
        var offsetTop = section.offsetTop;

        // Scroll to the section with smooth animation
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Function to show the selected section
function showSection(sectionId) {
    // Hide all sections
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Event listener for the sidebar navigation
var navLinks = document.querySelectorAll('.nav li');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        var sectionId = this.getAttribute('onclick').split("'")[1];
        showSection(sectionId);
    });
});

// Initial call to show the first section
document.addEventListener('DOMContentLoaded', function () {
    showSection('sampler');
});

// JavaScript function to scroll to sections
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        // Calculate the offset of the section relative to the document
        var offsetTop = section.offsetTop;

        // Scroll to the section with smooth animation
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
function handleNavClick(event) {
    var sectionId = event.target.getAttribute('onclick').split("'")[1];
    showSection(sectionId);

    // Remove active class from all links
    var navLinks = document.querySelectorAll('.nav li');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Add active class to the clicked link
    event.target.classList.add('active');
}
// Function to show the selected section
function showSection(sectionId) {
    // Hide all sections
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }

    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Event listener for the sidebar navigation
var navLinks = document.querySelectorAll('.nav li');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        var sectionId = this.getAttribute('onclick').split("'")[1];
        showSection(sectionId);
    });
});

// Initial call to show the first section
document.addEventListener('DOMContentLoaded', function () {
    showSection('sampler');
});

// Function to calculate and display results for the sampler section
function calculateSampler() {
    var bandwidth = parseFloat(document.getElementById('bandwidth').value);
    var frequencyUnit = document.querySelector('input[name="frequencyUnit"]:checked').value;
    var quantizerBits = parseInt(document.getElementById('quantizerBits').value);
    var compressionRate = parseFloat(document.getElementById('compressionRate').value);
    var channelEncoderRate = parseFloat(document.getElementById('channelEncoderRate').value);
    
    // Validate inputs
    if (isNaN(bandwidth) || bandwidth <= 0) {
        alert("Please enter a valid bandwidth.");
        return;
    }
    if (isNaN(quantizerBits) || quantizerBits <= 0) {
        alert("Please enter a valid number of quantizer bits.");
        return;
    }
    if (isNaN(compressionRate) || compressionRate <= 0 || compressionRate >= 1) {
        alert("Please enter a valid compression rate (0 < Rs < 1).");
        return;
    }
    if (isNaN(channelEncoderRate) || channelEncoderRate <= 0) {
        alert("Please enter a valid channel encoder rate.");
        return;
    }
    
    // Convert bandwidth to Hz
    if (frequencyUnit === 'kHz') {
        bandwidth *= 1000;
    } else if (frequencyUnit === 'MHz') {
        bandwidth *= 1000000;
    }

    // Calculate sampling frequency (Nyquist rate)
    var samplingFrequency = 2 * bandwidth;

    // Calculate number of quantization levels
    var quantizationLevels = Math.pow(2, quantizerBits);

    // Calculate bit rate at the output of the quantizer
    var bitRateQuantizer = samplingFrequency * quantizerBits;

    // Calculate bit rate at the output of the source encoder
    var bitRateSourceEncoder = bitRateQuantizer * compressionRate;

    // Calculate bit rate at the output of the channel encoder
    var bitRateChannelEncoder = bitRateSourceEncoder / channelEncoderRate;

    // Calculate bit rate at the output of the interleaver
    var bitRateInterleaver = bitRateChannelEncoder;

    // Display results
    displayOutputs(samplingFrequency, quantizationLevels, bitRateQuantizer, bitRateSourceEncoder, bitRateChannelEncoder, bitRateInterleaver);
}

function displayOutputs(samplingFrequency, quantizationLevels, bitRateQuantizer, bitRateSourceEncoder, bitRateChannelEncoder, bitRateInterleaver) {
    var resultElement = document.getElementById('samplerResult');
    resultElement.innerHTML = ''; // Clear previous results

    if (document.getElementById('outputSamplingFrequency').checked) {
        resultElement.innerHTML += `<div class="output-name">Sampling Frequency</div>`;
        resultElement.innerHTML += `<div class="output-box">${samplingFrequency.toFixed(2)} Hz</div>`;
    }

    if (document.getElementById('outputQuantizationLevels').checked) {
        resultElement.innerHTML += `<div class="output-name">Number of Quantization Levels</div>`;
        resultElement.innerHTML += `<div class="output-box">${quantizationLevels}</div>`;
    }

    if (document.getElementById('outputBitRateQuantization').checked) {
        resultElement.innerHTML += `<div class="output-name">Bit Rate at Quantizer</div>`;
        resultElement.innerHTML += `<div class="output-box">${bitRateQuantizer.toFixed(2)} bits/sec</div>`;
    }

    if (document.getElementById('outputBitRateSourceEncoder').checked) {
        resultElement.innerHTML += `<div class="output-name">Bit Rate at Source Encoder</div>`;
        resultElement.innerHTML += `<div class="output-box">${bitRateSourceEncoder.toFixed(2)} bits/sec</div>`;
    }

    if (document.getElementById('outputBitRateChannelEncoder').checked) {
        resultElement.innerHTML += `<div class="output-name">Bit Rate at Channel Encoder</div>`;
        resultElement.innerHTML += `<div class="output-box">${bitRateChannelEncoder.toFixed(2)} bits/sec</div>`;
    }

    if (document.getElementById('outputBitRateInterleaver').checked) {
        resultElement.innerHTML += `<div class="output-name">Bit Rate at Interleaver</div>`;
        resultElement.innerHTML += `<div class="output-box">${bitRateInterleaver.toFixed(2)} bits/sec</div>`;
    }
}

// Placeholder function for OFDM calculation
function calculateOFDM() {
    // Placeholder: Implement actual calculation logic
    document.getElementById('ofdmResult').innerText = "OFDM calculation is not implemented yet.";
}

// Toggle sidebar visibility
var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var container = document.querySelector('.container');
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('closed');
    container.classList.toggle('shifted');
});
