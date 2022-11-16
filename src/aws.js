var AWS = require('aws-sdk');

AWS.config.update({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});



var bucket = new AWS.S3({params: {Bucket: 'xxx'}});

function encode(data)
{
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}

function getUrlByFileName(fileName,mimeType) {
    return new Promise(
        function (resolve, reject) {
            bucket.getObject({Key: fileName}, function (err, file) {
                var result =  mimeType + encode(file.Body);
                resolve(result)
            });
        }
    );
}

// import AWS SDK
// configure using (login) using aws credentials
// get bucket
// get file (VAGUE)
// return file