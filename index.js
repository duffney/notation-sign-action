const core = require('@actions/core');
//const github = require('@actions/github');

try {
    // `image-name` input defined in action metadata file
    const imageName = core.getInput('image-name');
    console.log(imageName);
    const envelopeType = core.getInput('envolope-type');
    console.log(envelopeType);
    const mediaType = core.getInput('media-type');
    console.log(mediaType);
    const cmd = 'notation sign'
    let array = [];
    
    array.push(cmd)

    if (envelopeType != null) {
        array.push("--envolopetype "+envelopeType)
    }
    if (mediaType != null) {
        array.push("--media-type "+mediaType)
    }
    
    array.push(imageName)
    let result = array.join(' ');
    console.log(result)

    core.setOutput(result);

    // Get the JSON webhook payload for the event that triggered the workflow
    //const payload = JSON.stringify(github.context.payload, undefined, 2)
    //console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}