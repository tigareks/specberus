const self = {
    name: 'headers.subm-logo'
};

exports.name = self.name;

exports.check = function (sr, done) {
    var $logo = sr.$("body div.head a[href] > img[src][height=48][width=211][alt]")
                  .first()
    ,   type = sr.config.submissionType || "member"
    ,   checks = {
            member: {
                alt:    "W3C Member Submission"
            ,   src:    /^(https:)?\/\/www\.w3\.org\/Icons\/member_subm(\.png|\.gif)?$/
            ,   href:   /^(https:)?\/\/www\.w3\.org\/Submission\/?$/
            }
        ,   team: {
                alt:    "W3C Team Submission"
            ,   src:    /^(https:)?\/\/www\.w3\.org\/Icons\/team_subm(\.png|\.gif)?$/
            ,   href:   /^(https:)?\/\/www\.w3\.org\/TeamSubmission\/?$/
            }
        }
    ;
    if (!$logo.length || $logo.attr("alt") !== checks[type].alt ||
        !checks[type].src.test($logo.attr("src")) ||
        !checks[type].href.test($logo.parent().attr("href"))) {
        sr.error(self, "not-found", { type: type.charAt(0).toUpperCase() + type.slice(1) });
    }
    done();
};
