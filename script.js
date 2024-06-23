
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
    resultElement.innerHTML += `<div class="output-box">${throughput.toFixed(10)}</div>`;
}


// Toggle sidebar visibility
var toggleBtn = document.getElementById('toggleBtn');
var sidebar = document.getElementById('sidebar');
var container = document.querySelector('.container');
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('closed');
    container.classList.toggle('shifted');
});


// Arrays to store the Eb/N0 values corresponding to BER values for each modulation technique
const modulationData = {
    "QPSK/BPSK": [
        { BER: 1e-1, EbN0: 1 },
        { BER: 1e-2, EbN0: 5 },
        { BER: 1e-3, EbN0: 7 },
        { BER: 1e-4, EbN0: 8 },
        { BER: 1e-5, EbN0: 9 },
        { BER: 1e-6, EbN0: 10 },
        { BER: 1e-7, EbN0: 11 },
        { BER: 1e-8, EbN0: 12 }
       
    ],
    "8-PSK": [
        { BER: 1e-1, EbN0: 5 },
        { BER: 1e-2, EbN0: 7 },
        { BER: 1e-3, EbN0: 10 },
        { BER: 1e-4, EbN0: 12 },
        { BER: 1e-5, EbN0: 13 },
        { BER: 1e-6, EbN0: 14 },
        { BER: 1e-7, EbN0: 15 },
        { BER: 1e-8, EbN0: 16 }
     
    ],
    "16-PSK": [
        { BER: 1e-1, EbN0: 8 },
        { BER: 1e-2, EbN0: 11 },
        { BER: 1e-3, EbN0: 14 },
        { BER: 1e-4, EbN0: 16 },
        { BER: 1e-5, EbN0: 17 },
        { BER: 1e-6, EbN0: 18 },
        { BER: 1e-7, EbN0: 19 }
       
        
    ]
};

// Function to retrieve the closest Eb/N0 value for a given BER and modulation type
function findClosestEbN0(modulationType, targetBER) {
    const entries = modulationData[modulationType];
    let closest = entries[0]; // Start with the first entry as the closest
    let smallestDiff = Math.abs(entries[0].BER - targetBER); // Calculate initial difference

    for (let i = 1; i < entries.length; i++) {
        let currentDiff = Math.abs(entries[i].BER - targetBER); // Calculate difference for current entry
        if (currentDiff < smallestDiff) { // If current difference is smaller, update closest
            closest = entries[i];
            smallestDiff = currentDiff; // Update the smallest difference found
        }
    }
    return closest.EbN0; // Return the Eb/N0 of the closest entry
}

// Function to handle transmission power calculation
function calculateTransmissionPower() {
    const modulationType = document.getElementById('modulation').value;
    const berInput = document.getElementById('maxBitErrorRate').value;
    const targetBER = Number.parseFloat(berInput);

    // Read inputs and selected units
    const pathLoss = parseFloat(document.getElementById('pathLoss').value);
    const pathLossUnit = document.querySelector('input[name="pathLossUnit"]:checked').value;

    const frequency = parseFloat(document.getElementById('frequency').value);
    const frequencyUnit = document.querySelector('input[name="frequencyUnit"]:checked').value;

    const transmitAntennaGain = parseFloat(document.getElementById('transmitAntennaGain').value);
    const transmitAntennaGainUnit = document.querySelector('input[name="transmitAntennaGainUnit"]:checked').value;

    const receiveAntennaGain = parseFloat(document.getElementById('receiveAntennaGain').value);
    const receiveAntennaGainUnit = document.querySelector('input[name="receiveAntennaGainUnit"]:checked').value;

    const noiseFigureTotal = parseFloat(document.getElementById('noiseFigureTotal').value);
    const noiseFigureTotalUnit = document.querySelector('input[name="noiseFigureTotalUnit"]:checked').value;

    const noiseTemperature = parseFloat(document.getElementById('noiseTemperature').value);
    const noiseTemperatureUnit = document.querySelector('input[name="noiseTemperatureUnit"]:checked').value;

    const linkMargin = parseFloat(document.getElementById('linkMargin').value);
    const linkMarginUnit = document.querySelector('input[name="linkMarginUnit"]:checked').value;

    const maxBitErrorRate = parseFloat(document.getElementById('maxBitErrorRate').value);
 
    const dataRate = parseFloat(document.getElementById('dataRate').value);
    const dataRateUnit = document.querySelector('input[name="dataRateUnit"]:checked').value;

    const antennaFeedLineLoss = parseFloat(document.getElementById('antennaFeedLineLoss').value);
    const antennaFeedLineLossUnit = document.querySelector('input[name="antennaFeedLineLossUnit"]:checked').value;

    const otherLosses = parseFloat(document.getElementById('otherLosses').value);
    const otherLossesUnit = document.querySelector('input[name="otherLossesUnit"]:checked').value;

    const fadeMargin = parseFloat(document.getElementById('fadeMargin').value);
    const fadeMarginUnit = document.querySelector('input[name="fadeMarginUnit"]:checked').value;

    const receiverAmplifierGain = parseFloat(document.getElementById('receiverAmplifierGain').value);
    const receiverAmplifierGainUnit = document.querySelector('input[name="receiverAmplifierGainUnit"]:checked').value;

    const transmitAmplifierGain = parseFloat(document.getElementById('transmitAmplifierGain').value);
    const transmitAmplifierGainUnit = document.querySelector('input[name="transmitAmplifierGainUnit"]:checked').value;

    // Convert frequency to Hz
    let frequencyHz = frequency;
    if (frequencyUnit === 'KHz') frequencyHz *= 1000;
    if (frequencyUnit === 'MHz') frequencyHz *= 1e6;

//convert data rate to bps then dp 
    let dataRateDb ;
    if (dataRateUnit === 'kbps'){
        dataRateDb = 10 * Math.log10(dataRate * 1000);
    } else if (dataRateUnit === 'mbps'){
        dataRateDb = 10 * Math.log10(dataRate * 1e6);
    }else{
        dataRateDb = 10 * Math.log10(dataRate);
    }




    // Convert power values to dB
    const pathLossDb = convertToDb(pathLoss, pathLossUnit);
    const transmitGainDb = convertToDb(transmitAntennaGain, transmitAntennaGainUnit);
    const receiveGainDb = convertToDb(receiveAntennaGain, receiveAntennaGainUnit);
    const noiseFigureDb = convertToDb(noiseFigureTotal, noiseFigureTotalUnit);
    const linkMarginDb = convertToDb(linkMargin, linkMarginUnit);
    const  antennaFeedLineLossDb = convertToDb(antennaFeedLineLoss, antennaFeedLineLossUnit);
    const otherLossesDb = convertToDb(otherLosses, otherLossesUnit);
    const fadeMarginDb = convertToDb(fadeMargin, fadeMarginUnit);
    const receiverAmplifierGainDb = convertToDb(receiverAmplifierGain, receiverAmplifierGainUnit);
    const transmitAmplifierGainDb = convertToDb(transmitAmplifierGain, transmitAmplifierGainUnit);


    // Convert noise temperature to dB
    let noiseTemperatureDb;
    if (noiseTemperatureUnit === 'Celcius') {
        noiseTemperatureDb = 10 * Math.log10(noiseTemperature + 273.15); // Convert Celsius to Kelvin, then to dB
    } else {
        noiseTemperatureDb = 10 * Math.log10(noiseTemperature); // Already in Kelvin, convert to dB
    }



    if (isNaN(targetBER) || targetBER <= 0 || targetBER > 1) {
        document.getElementById('EbN0').textContent = "Invalid BER input. Please enter a value between 0 and 1 in standard or scientific notation (e.g., 1e-5).";
        return;
    }

    const requiredEbN0 = findClosestEbN0(modulationType, targetBER);
    document.getElementById('EbN0').textContent = `${requiredEbN0}`;
   /* document.getElementById('transmissionResult').innerHTML = `Required Eb/N0 for ${modulationType} at BER ${targetBER.toExponential()} is ${requiredEbN0} dB`;*/

   // Calculate recieved power
   const pr = linkMarginDb + (-228.6) + noiseTemperatureDb + noiseFigureDb + dataRateDb+ requiredEbN0;
document.getElementById('receivedPower').textContent = `${pr.toFixed(2)} dB`;
   
//calculate transmission power
const pt = pr + pathLossDb + otherLossesDb +fadeMarginDb+ antennaFeedLineLossDb - transmitGainDb - receiveGainDb - receiverAmplifierGainDb - transmitAmplifierGainDb;
document.getElementById('transmitPower').textContent = `${pt.toFixed(2)} dB`;
}



// Helper function to convert various power inputs to dB
function convertToDb(value, unit) {
    switch(unit) {
        case 'Watt':
            return 10 * Math.log10(value); // Convert Watts to dB
        case 'dBm':
            return value - 30; // Convert dBm to dB
        default:
            return value; // Already in dB
    }
}



function calculateCellular() {
    // Gather input values and their units
    const refDistance = parseFloat(document.getElementById('ref-distance').value);
    const refDistanceUnit = document.querySelector('input[name="refDistUnit"]:checked').value;
    const receiverSensitivity = parseFloat(document.getElementById('receiver-sens').value);
    const receiverSensitivityUnit = document.querySelector('input[name="receiverSensitivityUnit"]:checked').value;
    const refPower = parseFloat(document.getElementById('ref-power').value);
    const refPowerUnit = document.querySelector('input[name="refPowerUnit"]:checked').value;
    const gos = parseFloat(document.getElementById('gos').value);
    const timeSlots = parseFloat(document.getElementById('time-slot').value);
 // Gather input values and their units
 const users = parseFloat(document.getElementById('users-no').value);
 const usersUnit = document.querySelector('input[name="usersNoUnit"]:checked').value;
 const avgCalls = parseFloat(document.getElementById('avg-calls').value);
 const avgCallsUnit = document.querySelector('input[name="avgCallsUnit"]:checked').value;
 const avgCallDuration = parseFloat(document.getElementById('avg-call-duration').value);
 const avgCallDurationUnit = document.querySelector('input[name="avgCallDurationUnit"]:checked').value;
 const pathLoss = parseFloat(document.getElementById('path-loss').value);
  // Retrieve and convert input values
  const sir = parseFloat(document.getElementById('sir').value);
  const sirUnit = document.querySelector('input[name="sirUnit"]:checked').value;
  const coChannels = parseFloat(document.getElementById('cochannels').value);
  const erlangBTable = {
    "0.1%": [0.001, 0.046, 0.194, 0.439, 0.762, 1.100, 1.600, 2.100, 2.600, 3.100, 3.700,
         4.200, 4.800, 5.400, 6.100, 6.700, 7.400, 8.000, 8.700, 9.400, 10.100,
          10.800, 11.500, 12.200, 13.000, 13.700, 14.400, 15.200, 15.900, 16.700,
           17.400, 18.200, 19.000, 19.700, 20.500, 21.300, 22.100, 22.900, 23.700,
            24.400, 25.200, 26.000, 26.800, 27.600, 28.400],
    "0.2%": [0.002, 0.065, 0.249, 0.535, 0.900, 1.300, 1.800, 
        2.300, 2.900, 3.400, 4.000, 4.600, 5.300, 5.900, 6.600, 
        7.300, 7.900, 8.600, 9.400, 10.100, 10.800, 11.500, 12.300,
         13.000, 13.800, 14.500, 15.300, 16.100, 16.800, 17.600, 18.400,
          19.200, 20.000, 20.800, 21.600, 22.400, 23.200, 24.000, 24.800, 25.600,
           26.400, 27.200, 28.100, 28.900, 29.7],
    "0.5%": [0.005, 0.105, 0.349, 0.701, 1.132, 1.600, 2.200, 2.700,
         3.300, 4.000, 4.600, 5.300, 6.000, 6.700, 7.400, 8.100, 8.800, 
         9.600, 10.300, 11.100, 11.900, 12.600, 13.400, 14.200, 15.000, 15.800,
          16.600, 17.400, 18.200, 19.000, 19.900, 20.700, 21.500, 22.300, 23.200,
           24.000, 24.800, 25.700, 26.500, 27.400, 28.200, 29.100, 29.900, 30.800, 31.7],
    "1%": [0.010, 0.153, 0.455, 0.869, 1.361, 1.900, 2.500, 3.100, 3.800, 4.500, 5.200,
        5.900, 6.600, 7.400, 8.100, 8.900, 9.700, 10.400, 11.200, 12.000, 12.800, 13.700,
         14.500, 15.300, 16.100, 17.000, 17.800, 18.600, 19.500, 20.300, 21.200, 22.000, 22.900,
          23.800, 24.600, 25.500, 26.400, 27.300, 28.100, 29.000, 29.900, 30.800, 31.700, 32.500, 33.4],
    "1.2%": [0.012, 0.168, 0.489, 0.922, 1.431, 2.000, 2.600, 3.200, 3.900, 
        4.600, 5.300, 6.100, 6.800, 7.600, 8.300, 9.100, 9.900, 10.700, 11.500,
         12.300, 13.100, 14.000, 14.800, 15.600, 16.500, 17.300, 18.200, 19.000,
          19.900, 20.700, 21.600, 22.500, 23.300, 24.200, 25.100, 26.000, 26.800,
           27.700, 28.600, 29.500, 30.400, 31.300, 32.200, 33.100, 34.000],
    "1.3%": [0.013, 0.176, 0.505, 0.946, 1.464, 2.000, 2.700, 3.300, 4.000,
         4.700, 5.400, 6.100, 6.900, 7.700, 8.400, 9.200, 10.000, 10.800, 
         11.600, 12.400, 13.300, 14.100, 14.900, 15.800, 16.600, 17.500, 
         18.300, 19.200, 20.000, 20.900, 21.800, 22.600, 23.500, 24.400, 
         25.300, 26.200, 27.000, 27.900, 28.800, 29.700, 30.600, 31.500,
          32.400, 33.300, 34.200],
    "1.5%": [0.020, 0.190, 0.530, 0.990, 1.520, 2.100, 2.700, 3.400, 4.100, 
        4.800, 5.500, 6.300, 7.000, 7.800, 8.600, 9.400, 10.200, 11.000, 11.800,
         12.600, 13.500, 14.300, 15.200, 16.000, 16.900, 17.700, 18.600, 19.500,
          20.300, 21.200, 22.100, 22.900, 23.800, 24.700, 25.600, 26.500, 27.400,
           28.300, 29.200, 30.100, 31.000, 31.900, 32.800, 33.700, 34.600],
    "2%": [0.020, 0.223, 0.602, 1.092, 1.657, 2.300, 2.900, 3.600, 4.300, 5.100,
         5.800, 6.600, 7.400, 8.200, 9.000, 9.800, 10.700, 11.500, 12.300, 13.200, 
         14.000, 14.900, 15.800, 16.600, 17.500, 18.400, 19.300, 20.200, 21.000, 21.900,
          22.800, 23.700, 24.600, 25.500, 26.400, 27.300, 28.300, 29.200, 30.100, 31.000, 
          31.900, 32.800, 33.800, 34.700, 35.600],
    "3%": [0.031, 0.282, 0.715, 1.259, 1.875, 2.500, 3.200, 4.000, 4.700, 5.500,
         6.300, 7.100, 8.000, 8.800, 9.600, 10.500, 11.400, 12.200, 13.100, 14.000,
          14.900, 15.800, 16.700, 17.600, 18.500, 19.400, 20.300, 21.200, 22.100, 23.100,
           24.000, 24.900, 25.800, 26.800, 27.700, 28.600, 29.600, 30.500, 31.500, 32.400,
            33.400, 34.300, 35.300, 36.200, 37.200],
    "5%": [0.053, 0.381, 0.899, 1.525, 2.218, 3.000, 3.700, 4.500, 5.400, 6.200,
         7.100, 8.000, 8.800, 9.700, 10.600, 11.500, 12.500, 13.400, 14.300, 15.200,
          16.200, 17.100, 18.100, 19.000, 20.000, 20.900, 21.900, 22.900, 23.800,
           24.800, 25.800, 26.700, 27.700, 28.700, 29.700, 30.700, 31.600, 32.600,
            33.600, 34.600, 35.600, 36.600, 37.600, 38.600, 39.600],
    "7%": [0.075, 0.470, 1.057, 1.748, 2.504, 3.300, 4.100, 5.000, 5.900, 6.800,
         7.700, 8.600, 9.500, 10.500, 11.400, 12.400, 13.400, 14.300, 15.300, 16.300,
          17.300, 18.200, 19.200, 20.200, 21.200, 22.200, 23.200, 24.200, 25.200, 26.200,
           27.200, 28.200, 29.300, 30.300, 31.300, 32.300, 33.300, 34.400, 35.400, 36.400,
            37.400, 38.400, 39.500, 40.500, 41.500],
    "10%": [0.111, 0.595, 1.271, 2.045, 2.881, 3.800, 4.700, 5.600, 6.500, 7.500, 
        8.500, 9.500, 10.500, 11.500, 12.500, 13.500, 14.500, 15.500, 16.600, 17.600,
         18.700, 19.700, 20.700, 21.800, 22.800, 23.900, 24.900, 26.000, 27.100, 28.100, 
         29.200, 30.200, 31.300, 32.400, 33.400, 34.500, 35.600, 36.600, 37.700, 38.800,
          39.900, 40.900, 42.000, 43.100, 44.200],
    "15%": [0.176, 0.796, 1.602, 2.501, 3.454, 4.400, 5.500, 6.500, 7.600, 8.600, 9.700,
         10.800, 11.900, 13.000, 14.100, 15.200, 16.300, 17.400, 18.500, 19.600, 20.800,
          21.900, 23.000, 24.200, 25.300, 26.400, 27.600, 28.700, 29.900, 31.000, 32.100,
           33.300, 34.400, 35.600, 36.700, 37.900, 39.000, 40.200, 41.300, 42.500, 43.600,
            44.800, 45.900, 47.100, 48.200],
    "20%": [0.250, 1.000, 1.930, 2.950, 4.010, 5.100, 6.200, 7.400, 8.500, 9.700, 10.900, 
        12.000, 13.200, 14.400, 15.600, 16.800, 18.000, 19.200, 20.400, 21.600, 22.800, 24.100,
         25.300, 26.500, 27.700, 28.900, 30.200, 31.400, 32.600, 33.800, 35.100, 36.300, 37.500, 
         38.800, 40.000, 41.200, 42.400, 43.700, 44.900, 46.100, 47.400, 48.600, 49.900, 51.100, 52.300],
    "30%": [0.429, 1.450, 2.633, 3.890, 5.189, 6.500, 7.900, 9.200, 10.600, 12.000, 13.300,
         14.700, 16.100, 17.500, 18.900, 20.300, 21.700, 23.100, 24.500, 25.900, 27.300, 28.700,
          30.100, 31.600, 33.000, 34.400, 35.800, 37.200, 38.600, 40.000, 41.500, 42.900, 44.300,
           45.700, 47.100, 48.600, 50.000, 51.400, 52.800, 54.200, 55.700, 57.100, 58.500, 59.900, 61.300]
};
const erlangKeys = Object.keys(erlangBTable).map(k => parseFloat(k));
const matchedGos = matchGos(gos, erlangKeys);

    // Total area input and unit
    const totalArea = parseFloat(document.getElementById('total-area').value);
    const totalAreaUnit = document.querySelector('input[name="totalAreaUnit"]:checked').value;

    // Convert all inputs to standard units (meters and watts)
    const refDistanceInMeters = convertDistance(refDistance, refDistanceUnit);
    const receiverSensitivityInWatts = convertPower(receiverSensitivity, receiverSensitivityUnit, 'Watt');
    const refPowerInWatts = convertPower(refPower, refPowerUnit, 'Watt');
    const totalAreaInMeters = convertArea(totalArea, totalAreaUnit);

    // Calculate maximum distance using the provided formula
    const maxDistance = refDistanceInMeters / Math.pow((receiverSensitivityInWatts / refPowerInWatts),(1/pathLoss));

    // Calculate maximum cell size using the provided hexagonal area formula
    const maxCellSize = (3 * Math.sqrt(3) * Math.pow(maxDistance, 2)) / 2;

    // Calculate the number of cells in the service area
    const numberOfCells = totalAreaInMeters / maxCellSize;
    
 // Convert users from thousands if necessary
    const totalUsers = usersUnit === 'Kusers' ? users * 1000 : users;

    // Convert average calls to calls per second
    let avgCallsPerSecond;
    switch (avgCallsUnit) {
        case 'calls/day':
            avgCallsPerSecond = avgCalls / (24 * 3600); // convert from calls/day to calls/sec
            break;
        case 'calls/hour':
            avgCallsPerSecond = avgCalls / 3600; // convert from calls/hour to calls/sec
            break;
        case 'calls/min':
            avgCallsPerSecond = avgCalls / 60; // convert from calls/min to calls/sec
            break;
        default:
            avgCallsPerSecond = avgCalls; // already in calls/sec
    }

    // Convert average call duration to seconds per call if necessary
    const callDurationInSeconds = avgCallDurationUnit === 'min/call' ? avgCallDuration * 60 : avgCallDuration;

    // Calculate traffic load in Erlangs
    const trafficLoad = totalUsers * avgCallsPerSecond * callDurationInSeconds;

     // Calculate traffic load per cell
     const trafficLoadPerCell = trafficLoad / numberOfCells;

     // Convert SIR to Watts if necessary
    const sirInWatts = convertPower(sir, sirUnit, 'Watt');

    // Calculate the number of cells in each cluster
    const cellsInEachCluster = Math.pow((sirInWatts * coChannels), 2/pathLoss) / 3;
    let closestIndex = 0;
    let smallestDifference = Math.abs(erlangBTable[matchedGos][0] - trafficLoadPerCell);

    for (let i = 1; i < erlangBTable[matchedGos].length; i++) {
        let difference = Math.abs(erlangBTable[matchedGos][i] - trafficLoadPerCell);
        if (difference < smallestDifference) {
            closestIndex = i;
            smallestDifference = difference;
        }
    }
    if(erlangBTable[matchedGos][0]>closestIndex)
        closestIndex-=1;
   
    const carriers = (closestIndex/timeSlots)*cellsInEachCluster;

    
    // Define the set of specific values
    const specificValues = [0, 1, 3, 4, 7, 9, 12, 13, 16, 19, 21, 25, 27, 28, 31, 36, 37, 39, 43, 48, 49, 52, 57, 61, 63, 64, 67, 73, 75, 76, 79, 81];

    // Find the nearest number greater than or equal to the calculated value
    const nearestGreater = specificValues.find(value => value >= cellsInEachCluster);



    // Display the results
    document.getElementById('maxDistance').textContent = maxDistance.toFixed(2) + ' meters';
    document.getElementById('maxCellSize').textContent = maxCellSize.toFixed(2) + ' square meters';
    document.getElementById('noOfCells').textContent = Math.ceil(numberOfCells); 
    document.getElementById('trafficLoad').textContent = trafficLoad.toFixed(2) + ' Erlangs';
    document.getElementById('trafficLoadCell').textContent = trafficLoadPerCell.toFixed(2) + ' Erlangs';
    document.getElementById('noOfCellsCluster').textContent = cellsInEachCluster.toFixed(2);
    document.getElementById('noOfCellsCluster').textContent = nearestGreater !== undefined ? nearestGreater+ 'cell/cluster': "No suitable value";
    document.getElementById('noOfTrunkedChannels').textContent = "no of channels from the table= "+closestIndex+"   Minimum number of carriers needed="+carriers.toFixed(2);
}

// Function to convert distance to meters
function convertDistance(value, unit) {
    switch (unit) {
        case 'km':
            return value * 1000; // Convert kilometers to meters
        case 'm':
        default:
            return value; // Already in meters or no conversion needed
    }
}

// Function to convert area to square meters
function convertArea(value, unit) {
    if (unit === 'km2') {
        return value * 1000000; // Convert square kilometers to square meters
    } else {
        return value; // Assume the value is already in square meters if not specified
    }
}
function matchGos(gos, keys) {
    const indexedKeys = keys.map((value, index) => ({ value, index }));
    indexedKeys.sort((a, b) => Math.abs(gos - a.value) - Math.abs(gos - b.value));
    return indexedKeys[0].value+'%'; // Return the index of the closest match
}


// Function to convert power to Watts
function convertPower(value, unit, toUnit) {
    if (unit === toUnit) return value; // No conversion needed

    switch (unit) {
        case 'dBm':
            return Math.pow(10, (value - 30) / 10); // Convert dBm to Watts
        case 'dB':
            return Math.pow(10, value / 10); // Convert dB to Watts assuming the reference is 1W
        case 'uWatt':
            return value * 1e-6; // Convert microWatts to Watts
        case 'Watt':
        default:
            return value; // Already in Watts or no conversion needed
    }
}

function findNumberOfChannels(traffic, erlangs) {
    let closestIndex = 0;
    let smallestDifference = Math.abs(erlangs[0] - traffic);

    for (let i = 1; i < erlangs.length; i++) {
        let difference = Math.abs(erlangs[i] - traffic);
        if (difference < smallestDifference) {
            closestIndex = i;
            smallestDifference = difference;
        }
    }

    return closestIndex;
}
