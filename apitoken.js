var VideoSDKMeeting = /*#__PURE__*/function () {
  function VideoSDKMeeting() {}

  var _proto = VideoSDKMeeting.prototype;

  _proto.init = function init(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        micEnabled = _ref.micEnabled,
        webcamEnabled = _ref.webcamEnabled,
        name = _ref.name,
        userMeetingId = _ref.meetingId,
        redirectOnLeave = _ref.redirectOnLeave,
        chatEnabled = _ref.chatEnabled,
        screenShareEnabled = _ref.screenShareEnabled,
        pollEnabled = _ref.pollEnabled,
        whiteBoardEnabled = _ref.whiteBoardEnabled,
        participantCanToggleSelfWebcam = _ref.participantCanToggleSelfWebcam,
        participantCanToggleSelfMic = _ref.participantCanToggleSelfMic,
        raiseHandEnabled = _ref.raiseHandEnabled,
        containerId = _ref.containerId,
        recordingEnabled = _ref.recordingEnabled,
        recordingWebhookUrl = _ref.recordingWebhookUrl,
        recordingEnabledByDefault = _ref.recordingEnabledByDefault,
        participantCanToggleRecording = _ref.participantCanToggleRecording,
        brandingEnabled = _ref.brandingEnabled,
        brandLogoURL = _ref.brandLogoURL,
        brandName = _ref.brandName,
        apiKey = _ref.apiKey,
        participantCanLeave = _ref.participantCanLeave,
        poweredBy = _ref.poweredBy,
        livestream = _ref.livestream,
        joinScreen = _ref.joinScreen,
        initPermissions = _ref.permissions,
        notificationSoundEnabled = _ref.notificationSoundEnabled;

    try {
      if (!livestream) livestream = {};
      if (!initPermissions) initPermissions = {};
      if (!joinScreen) joinScreen = {};
      var _initPermissions = initPermissions,
          askJoin = _initPermissions.askToJoin,
          participantCanToggleOtherWebcam = _initPermissions.toggleParticipantWebcam,
          participantCanToggleOtherMic = _initPermissions.toggleParticipantMic;

      if (askJoin) {
        participantCanToggleOtherWebcam = false;
        participantCanToggleOtherMic = false;
      }

      var _livestream = livestream,
          liveStreamEnabled = _livestream.visible,
          autoStartLiveStream = _livestream.autoStart,
          liveStreamOutputs = _livestream.outputs;
      var _joinScreen = joinScreen,
          joinScreenEnabled = _joinScreen.visible,
          joinScreenMeetingUrl = _joinScreen.meetingUrl,
          joinScreenTitle = _joinScreen.title;

      if (!apiKey) {
        throw new Error("'apiKey' not provided!");
      }

      var BASE_URL = "http://localhost:9000";
      var urlToken = BASE_URL + "/get-token";
      var permissions = ["allow_mod"];

      if (askJoin) {
        permissions.push("ask_join");
      } else {
        permissions.push("allow_join");
      }

      var tokenBody = {
        apiKey: apiKey
      };

      if (permissions.length) {
        tokenBody["permissions"] = permissions;
      }

      return Promise.resolve(fetch(urlToken, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })).then(function (res) {
        return Promise.resolve(res.json()).then(function (json) {
          var token = json.token;
          var urlMeetingId = BASE_URL + "/validate-meeting/" + userMeetingId;
          return Promise.resolve(fetch(urlMeetingId, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: token
            },
            body: JSON.stringify({
              apiKey: apiKey
            })
          })).then(function (resMeetingId) {
            return Promise.resolve(resMeetingId.json()).then(function (meetingIdJson) {
              var meetingId = meetingIdJson.meetingId;
              var myDocument = parent.document;
              var myWindow = parent.window;

              if (typeof myWindow === "undefined" || typeof myDocument === "undefined") {
                throw new Error("No browser detected!");
              }

              var iframe_id = "videosdk-frame";
              var meetingFrame = myDocument.createElement("iframe");
              meetingFrame.id = iframe_id;
              var iframe_src = "https://embed.videosdk.live/rtc-js-prebuilt/0.1.8/?micEnabled=" + encodeURIComponent(micEnabled ? "true" : "false") + "&webcamEnabled=" + encodeURIComponent(webcamEnabled ? "true" : "false") + "&name=" + encodeURIComponent(name) + "&meetingId=" + encodeURIComponent(meetingId) + "&redirectOnLeave=" + encodeURIComponent(redirectOnLeave) + "&chatEnabled=" + encodeURIComponent(chatEnabled ? "true" : "false") + "&screenShareEnabled=" + encodeURIComponent(screenShareEnabled ? "true" : "false") + "&pollEnabled=" + encodeURIComponent(pollEnabled ? "true" : "false") + "&whiteBoardEnabled=" + encodeURIComponent(whiteBoardEnabled ? "true" : "false") + "&participantCanToggleSelfWebcam=" + encodeURIComponent(participantCanToggleSelfWebcam ? "true" : "false") + "&participantCanToggleSelfMic=" + encodeURIComponent(participantCanToggleSelfMic ? "true" : "false") + "&raiseHandEnabled=" + encodeURIComponent(raiseHandEnabled ? "true" : "false") + "&token=" + encodeURIComponent(token) + "&recordingEnabled=" + encodeURIComponent(recordingEnabled ? "true" : "false") + "&recordingWebhookUrl=" + encodeURIComponent(recordingWebhookUrl || "") + "&recordingEnabledByDefault=" + encodeURIComponent(recordingEnabledByDefault ? "true" : "false") + "&participantCanToggleRecording=" + encodeURIComponent(participantCanToggleRecording ? "true" : "false") + "&brandingEnabled=" + encodeURIComponent(brandingEnabled ? "true" : "false") + "&brandLogoURL=" + encodeURIComponent(brandLogoURL || "") + "&brandName=" + encodeURIComponent(brandName) + "&participantCanLeave=" + encodeURIComponent(typeof participantCanLeave === "boolean" ? participantCanLeave ? "true" : "false" : "true") + "&poweredBy=" + encodeURIComponent(typeof poweredBy === "boolean" ? poweredBy ? "true" : "false" : "true") + "&liveStreamEnabled=" + encodeURIComponent(liveStreamEnabled ? "true" : "false") + "&autoStartLiveStream=" + encodeURIComponent(autoStartLiveStream ? "true" : "false") + "&liveStreamOutputs=" + encodeURIComponent(JSON.stringify(liveStreamOutputs || [])) + "&participantCanToggleOtherMic=" + encodeURIComponent(participantCanToggleOtherMic ? "true" : "false") + "&participantCanToggleOtherWebcam=" + encodeURIComponent(participantCanToggleOtherWebcam ? "true" : "false") + "&askJoin=" + encodeURIComponent(askJoin ? "true" : "false") + "&joinScreenEnabled=" + encodeURIComponent(joinScreenEnabled ? "true" : "false") + "&joinScreenMeetingUrl=" + encodeURIComponent(joinScreenMeetingUrl || "") + "&joinScreenTitle=" + encodeURIComponent(joinScreenTitle || "") + "&notificationSoundEnabled=" + encodeURIComponent(typeof notificationSoundEnabled === "boolean" ? notificationSoundEnabled ? "true" : "false" : "true");
              meetingFrame.src = iframe_src;
              meetingFrame.allowfullscreen = true;
              meetingFrame.width = "100%";
              meetingFrame.height = "100%";
              meetingFrame.allow = "camera *; microphone *; fullscreen; display-capture; allow-same-origin; allow-presentation; encrypted-media; midi; encrypted-media ";
              meetingFrame.style.border = 0;
              meetingFrame.allowusermedia = "allowusermedia";
              var iframeContainer = null;

              if (containerId) {
                var container = myDocument.getElementById(containerId);

                if (!container) {
                  throw new Error("No Container found with id " + containerId);
                }

                iframeContainer = container;
                container.appendChild(meetingFrame);
              } else {
                var _container = myDocument.createElement("div");

                _container.style.position = "fixed";
                _container.style.left = 0;
                _container.style.right = 0;
                _container.style.bottom = 0;
                _container.style.top = 0;
                _container.style.backgroundColor = "#212032";
                iframeContainer = _container;

                _container.appendChild(meetingFrame);

                myDocument.body.style.margin = "0px";
                myDocument.body.style.padding = "0px";
                myDocument.body.style.height = "100%";
                myDocument.body.style.overflow = "hidden";
                myDocument.body.appendChild(_container);
              }

              myWindow.addEventListener("popstate", function (e) {
                iframeContainer.remove();
              });
            });
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return VideoSDKMeeting;
}();

exports.VideoSDKMeeting = VideoSDKMeeting;
//# sourceMappingURL=index.js.map
