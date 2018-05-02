let imageUrl;

$('#tweetForm').submit(function(e) {
  e.preventDefault();
  const content = $('[name=content]').val();
  $.ajax({
    url: '/tweet',
    type: 'POST',
    data: {
      content,
      imageUrl,
    },
    success(res) {
      if (res.success) location.reload();
    }
  });
});

$('#tweetImage').click(function() {
  uploadcare.openDialog(null, {
    previewStep:true,
    crop:true,
  }).done((file) => {
    file.promise().done(fileInfo=>{
      imageUrl = fileInfo.cdnUrl;
      $('#previewImage').attr('src', fileInfo.cdnUrl).attr('alt', 'tweet')
    })
  })
});