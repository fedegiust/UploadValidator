"use strict";

function uploadValidator(btnId, uploadId, imageUpload, maxWidth, maxHeight){
	var _URL = window.URL || window.webkitURL,
		maxSize = 2097152,
		maxImageSize = 2097152,
		maxAttSize = 429916160,
		mbToByte = 1048576;

	if(btnId!=''){
		$(btnId).attr('disabled', 'disabled');
	}


	$(uploadId).change(
		function(e) {
			maxSize = $(this).attr('data-maxfilesize') * mbToByte;

			var files = e.originalEvent.target.files;
			for (var i=0, len=files.length; i<len; i++){
				var n = files[i].name,
					s = files[i].size,
					t = files[i].type,
					extension = files[i].extension;

				var ext = n.replace(/^.*\./, '');
				ext = ext.toLowerCase();
			   
				if(imageUpload === undefined) imageUpload = false;
				if(maxWidth === undefined) maxWidth = 2000;
				if(maxHeight === undefined) maxHeight = 2000;

				if(!imageUpload){
					if(maxSize > maxAttSize || maxSize <= 0 || isNaN(maxSize)){
						maxSize = maxAttSize;
					}
					switch (ext) {
						case 'jpg':
						case 'jpeg':
						case 'gif':
						case 'bmp':
						case 'pdf':
						case 'doc':
						case 'docx':
						case 'txt':
						case 'rtf':
						case 'mp4':
						case 'mov':
						case 'ppt':
						case 'pps':
						case 'pptx':
						case 'ppsx':
						case 'avi':
						case 'wmv':
						case 'xls':
						case 'xlsx':
							$(btnId).removeAttr('disabled');
							break;
						default:
							alert('This is not an allowed file type.');
							this.value = '';
					}       

				}else{
					if(maxSize > maxImageSize || maxSize <= 0 || isNaN(maxSize)){
						maxSize = maxImageSize;
					}
					switch (ext) {
						case 'jpg':
						case 'jpeg':
							$(btnId).removeAttr('disabled');
							var img;
                            var file = this.files[0];
							if (file) {
								img = new Image();
								img.onload = function () {
									if(this.width > maxWidth || this.height > maxHeight){
										alert('The image exceeds the maximum height (' + maxHeight + 'px) and maximum width (' + maxWidth + 'px) allowed.');
										$(uploadId).val('');
									}
								};
								img.src = _URL.createObjectURL(file);
							}
							break;
						default:
							alert('This is not an allowed file type.');
							this.value = '';
					}    
				}

				var chars = n.split(''); //split into characters
				var clean = "";
				var noInvalidChars = 0;
				for (var j = 0; j < chars.length; j++) {
				    if (chars[j].charCodeAt(0) < 255) {
				        clean += chars[j];
				    } else {
				        noInvalidChars++;
				    }
				}            
				if( noInvalidChars == 0){
				    //Valid, continue
				} else {
				    //Invalid, notify the user
				    alert('The file name contains invalid characters (Characters with accents, acutes, tildes or special characters are not allowed).\nFile name allowed would be something like: ' + clean + '.\nPlease verify your file name and try again.');
				    this.value = ''; 				
				}

				if( s >= maxSize ){
					alert('The file is too big. The maximum file size allowed is ' + $(this).attr('data-maxfilesize') + 'mb.');
					this.value = '';                     
				}
				if (n.length > 140) {
					alert('The file name is too long. The maximum number of characters allowed in a file name are 140 including the extension.');
					this.value = '';              
				}
			}
		}
	);
}
