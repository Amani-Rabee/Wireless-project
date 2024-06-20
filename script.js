
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
        alert("Please enter a valid number of quantizer bits!");
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
function calculateThroughput() {
    // Retrieve input values
    var protocol = document.getElementById('protocol').value;

    // Frame Size
    var frameSizeElement = document.getElementById('frameSize');
    var frameSize = parseFloat(frameSizeElement.value);
    var frameSizeUnit = document.querySelector('input[name="frameSizeUnit"]:checked');
    if (frameSizeUnit && frameSizeUnit.value === 'kbits') {
        frameSize *= 1000; // Convert Kbits to bits
    }

    // Frame Rate
    var frameRateElement = document.getElementById('frameRate');
    var frameRate = parseFloat(frameRateElement.value);
    var frameRateUnit = document.querySelector('input[name="frameRateUnit"]:checked');
    if (frameRateUnit && frameRateUnit.value === 'kfps') {
        frameRate *= 1000; // Convert Kfps to fps
    }

    // Data Transmission Bandwidth
    var dataTransmissionBWElement = document.getElementById('dataTransmissionBW');
    var dataTransmissionBW = parseFloat(dataTransmissionBWElement.value);
    var dataTransmissionBWUnit = document.querySelector('input[name="dataTransmissionBWUnit"]:checked');
    if (dataTransmissionBWUnit) {
        if (dataTransmissionBWUnit.value === 'kbps') {
            dataTransmissionBW *= 1000; // Convert Kbps to bps
        } else if (dataTransmissionBWUnit.value === 'mbps') {
            dataTransmissionBW *= 1000000; // Convert Mbps to bps
        }
    }

    // Propagation Time
    var propagationTimeElement = document.getElementById('propagationTime');
    var propagationTime = parseFloat(propagationTimeElement.value);
    var propagationTimeUnit = document.querySelector('input[name="propagationTimeUnit"]:checked');
    if (propagationTimeUnit.value === 'msec') {
        propagationTime /= 1000; // Convert msec to µsec
    }
    if ( propagationTimeUnit.value === 'usec') {
        propagationTime /= 1000000; // Convert µsec to µsec
    }

    // Validate inputs
    if (isNaN(frameSize) || isNaN(frameRate) || isNaN(dataTransmissionBW) || isNaN(propagationTime)) {
        alert('Please enter valid numeric values for all input fields.');
        return;
    }

    // Calculate Tb, Tframe, G, and alpha based on the converted values
    var Tb = 1 / dataTransmissionBW;
    var Tframe = frameSize * Tb;
    var G = frameRate * Tframe;
    var alpha = propagationTime / Tframe;

   
    // Perform calculations based on selected protocol
    var throughput;
    switch (protocol) {
        case 'pureAloha':
            throughput = G * Math.exp(-2 * G);
            break;
        case 'slottedAloha':
            throughput = G * Math.exp(-G);
            break;
        case 'unslottedNonPersistentCSMA':
            throughput = (G * Math.exp(-2 * alpha * Tframe)) / (G*(1 + 2 * alpha) + Math.exp(-G*alpha));
            break;
        case 'slottedNonPersistentCSMA':
            throughput = (alpha * G * Math.exp(-2 * alpha * Tframe)) / (1 - Math.exp(-G * alpha) + alpha);
            break;
        case 'unslotted1PersistentCSMA':
            throughput = ((G * (1 + G + alpha * G*(1+G+(alpha*G)/2))) * Math.exp(-G * (1 + 2 * alpha))) / ((G * (1 + 2 * alpha)) * (1 - Math.exp(-G*alpha)) + (1 + alpha * G) * Math.exp(-G * (1 + alpha)));
            break;
        case 'slotted1PersistentCSMA':
            throughput = (G * (1 + alpha - Math.exp(-alpha * G)) * Math.exp(-G * (1 + alpha))) / ((1 + alpha) * (1 - Math.exp(-alpha * G)) + alpha * Math.exp(-G * (1 + alpha)));
            break;
        default:
            throughput = 0;
            break;
    }

    // Display outputs
    displayThroughputOutputs(throughput);
}


function displayThroughputOutputs(throughput) {
    var resultElement = document.getElementById('throughputResult');
    resultElement.innerHTML = ''; // Clear previous results

    resultElement.innerHTML += `<div class="output-name">Throughput</div>`;
    resultElement.innerHTML += `<div class="output-box">${throughput.toFixed(3)}</div>`;
}


// Toggle sidebar visibility
var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var container = document.querySelector('.container');
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('closed');
    container.classList.toggle('shifted');
});


function calculateOFDM() {
    // Clear previous results
    document.getElementById('bitsPerElement').textContent = '';
    document.getElementById('bitsPerSymbol').textContent = '';
    document.getElementById('bitsPerBlock').textContent = '';
    document.getElementById('maxTransRate').textContent = '';

    var qam = document.getElementById('qam').value;
    var bandwidth = parseFloat(document.getElementById('bandwidth2').value);
    var bandwidthUnit = document.querySelector('input[name="bandwidthUnit"]:checked').value;
    var subcarrierSpacing = parseFloat(document.getElementById('subcarrierSpasing').value);
    var spacingUnit = document.querySelector('input[name="spacingUnit"]:checked').value;
    var ofdmSymbols = parseFloat(document.getElementById('ofdmSymbols').value);
    var parallelResourceBlock = parseFloat(document.getElementById('parallelResourseBlock').value);
    var blockDuration = parseFloat(document.getElementById('blockDuration').value);
    var durationUnit = document.querySelector('input[name="durationUnit"]:checked').value;

    var bitsPerElement = Math.log2(parseInt(qam));
    var adjustedBandwidth = bandwidthUnit === 'KHz' ? bandwidth * 1000 : bandwidth;
    var adjustedSpacing = spacingUnit === 'KHz' ? subcarrierSpacing * 1000 : subcarrierSpacing;
    var durationInSeconds = convertDurationToSeconds(blockDuration, durationUnit);

    // Perform all validations upfront
    var hasErrors = false;
    if (isNaN(bandwidth) || Math.floor(bandwidth) !== bandwidth) {
        alert("RB Bandwidth must be a whole number.");
        hasErrors = true;
    }
    if (isNaN(subcarrierSpacing) || Math.floor(subcarrierSpacing) !== subcarrierSpacing) {
        alert("Subcarrier Spacing must be a whole number.");
        hasErrors = true;
    }
    if (isNaN(ofdmSymbols) || Math.floor(ofdmSymbols) !== ofdmSymbols) {
        alert("OFDM Symbols must be a whole number.");
        hasErrors = true;
    }
    if (isNaN(blockDuration) || blockDuration <= 0) {
        alert("Block Duration must be a positive number.");
        hasErrors = true;
    }
    if (!qam || isNaN(bitsPerElement) || bitsPerElement % 1 !== 0) {
        alert("QAM must be a power of 2 (e.g., 16, 64, 256).");
        hasErrors = true;
    }
    if (isNaN(parallelResourceBlock) || Math.floor(parallelResourceBlock) !== parallelResourceBlock) {
        alert("Parallel Resource Block must be a whole number.");
        hasErrors = true;
    }

    if (hasErrors) return;  // Stop execution if there are errors

    // Calculation can proceed if there are no errors
    var bitsPerBlock = calculateBitsPerBlock(bitsPerElement, adjustedBandwidth, adjustedSpacing, ofdmSymbols);
    var maxTransRate = calculateMaxTransmissionRate(parallelResourceBlock, bitsPerBlock, durationInSeconds);

    // Update DOM elements with results
    document.getElementById('bitsPerElement').textContent = bitsPerElement.toFixed(2) + " bits/symbol";
    document.getElementById('bitsPerSymbol').textContent = (bitsPerElement * adjustedBandwidth / adjustedSpacing).toFixed(2) + " bits/symbol";
    document.getElementById('bitsPerBlock').textContent = bitsPerBlock.toFixed(2) + " bits/block";
    document.getElementById('maxTransRate').textContent = maxTransRate.toFixed(2) + " bits/sec";
}

function calculateBitsPerBlock(bitsPerElement, bandwidth, spacing, symbols) {
    return bitsPerElement * (bandwidth / spacing) * symbols;
}

function calculateMaxTransmissionRate(parallelBlocks, bitsPerBlock, seconds) {
    return (parallelBlocks * bitsPerBlock) / seconds;
}

function convertDurationToSeconds(duration, unit) {
    switch (unit) {
        case 'ms':
            return duration / 1000;
        case 'min':
            return duration * 60;
        case 'h':
            return duration * 3600;
        default:
            return duration; // Assumes seconds
    }
}
