import request from './_request';

const postPrayers = (userType) => { // 전체 기도문에 해당하는 정보를 가져옴.
    return request.post({
        path: `prayer/prayers`,
        body: {
            userType: userType
        }
    });
};

const getPrayerText = () => { // 기존 db에 저장된 텍스트를 가져옴
    return request.get({
        path: `general/prayer/text`,
    });
};

const postPrayerText = (inputText) => { // 새로 작성한 텍스트를 db에 저장
    return request.post({
        path: `general/prayer/text/post`,
        body: {
            inputText: inputText
        }
    });
};

const deletePrayerText = (idx) => {
    return request.delete({
        path: `general/prayer/text/delete/` + idx,
    });
}

const getFAQs = () => {
    return request.get({
        path: `general/faq/list`,
    })
}

const getFAQ = (idx) => {
    return request.get({
        path: `general/faq/view/` + idx,
    })
}

const postFAQ = (question, answer) => {
    return request.post({
        path: `general/faq/add`,
        body: {
            question: question,
            answer: answer
        }
    })
}

const putFAQ = (idx, answer) => {
    return request.put({
        path: `general/faq/update/` + idx,
        body: {
            answer: answer
        }
    })
}

const postDeletePrayer = (idx) => { // 새로 작성한 텍스트를 db에 저장
    return request.post({
        path: `prayer/postDeletePrayer`,
        body: {
            idx: idx
        }
    });
};

const postRegistration = (title, contents, division, select, target, record_file, image) => { // 새로 작성한 텍스트를 db에 저장
    return request.post({
        path: `prayer/registration`,
        body: {
            title: title,
            contents: contents,
            division: division,
            select: select,
            target: target,
            record_file: record_file,
            image: image
        }
    });
};

const postUpdate = (idx, title, contents, division, select, target, record_file, image) => { // 새로 작성한 텍스트를 db에 저장
    return request.post({
        path: `prayer/update`,
        body: {
            idx: idx,
            title: title,
            contents: contents,
            division: division,
            select: select,
            target: target,
            record_file: record_file,
            image: image
        }
    });
};

const getAchievements = () => {
    return request.get({
        path: `general/achievement/list`
    })
}

const getAchievement = (idx) => {
    return request.get({
        path: `general/achievement/view/` + idx
    })
}

const postAchievement = (name, detail, condition, term_start, term_end) => {
    return request.post({
        path: `general/achievement/add`,
        body: {
            name: name,
            detail: detail,
            condition: condition,
            term_start: term_start,
            term_end: term_end
        }
    })
}

const putAchievement = (idx, name, detail, rosary_condition, term_start, term_end) => {
    return request.put({
        path: `general/achievement/update/` + idx,
        body: {
            name: name,
            detail: detail,
            rosary_condition: rosary_condition,
            term_start: term_start,
            term_end: term_end
        }
    })
}

const deleteAchievement = (idx) => {
    return request.delete({
        path: `general/achievement/delete/` + idx
    })
}

const prayerApi = {
    postPrayers,
    getPrayerText,
    postPrayerText,
    deletePrayerText,
    postDeletePrayer,
    postRegistration,
    postUpdate,
    getFAQs,
    getFAQ,
    postFAQ,
    putFAQ,
    getAchievements,
    getAchievement,
    postAchievement,
    putAchievement,
    deleteAchievement
};
export default prayerApi;