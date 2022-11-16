const core = require('@actions/core');
const execSync = require('child_process').execSync;
//const github = require('@actions/github');

try {
    // `image-name` input defined in action metadata file
    const imageName = core.getInput('image-name');
    const envelopeType = core.getInput('envolope-type');
    const mediaType = core.getInput('media-type');
    const cmd = 'notation sign'
    let array = [];

    array.push(cmd)

    if (envelopeType != null) {
        array.push("--envelope-type "+envelopeType)
    }
    if (mediaType != null) {
        array.push("--media-type "+mediaType)
    }
    
    array.push(imageName)
    let result = array.join(' ');

    const output = execSync(result, { encoding: 'utf-8' });
    console.log('Ran command:', output);

    //core.setOutput(result);

} catch (error) {
    core.setFailed(error.message);
}