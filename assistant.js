const fetch = require("node-fetch");

let headers = {
            'Content-Type': 'application/json',
			'OpenAI-Beta': 'assistants=v1',
            'Authorization': 'Bearer '
        },
	profile = {};
		
async function getNewThread(){
	console.log('OpenAI New Thread request');
    const response = await fetch('https://aiproxy.businesschain.io/v1/threads', {
        method: 'POST',
        headers
    });
    const resp = await response.json();
    
    return resp.id;
}

async function deleteThread(threadId){
    console.log('OpenAI DELETE Thread request');
    const response = await fetch('https://aiproxy.businesschain.io/v1/threads/' + threadId, {
        method: 'DELETE',
        headers
    });
    const resp = await response.json();

    return resp['object'];
}

async function setNewMessage(message, threadId){
	console.log('OpenAI New Message request :: Thread ID :: ', threadId);
    const response = await fetch(`https://aiproxy.businesschain.io/v1/threads/${threadId}/messages`, {
        method: 'POST',
		body: JSON.stringify({role: "user", content: message}),
        headers
    });
    const resp = await response.json();
    
    return resp;
}

async function runThread(threadId, assistantId){
	console.log('OpenAI Run Thread request :: Thread ID :: ', threadId);
    const response = await fetch(`https://aiproxy.businesschain.io/v1/threads/${threadId}/runs`, {
        method: 'POST',
		body: JSON.stringify({assistant_id: assistantId}),
        headers
    });
    const resp = await response.json();
    
    return resp.id;
}

async function retrieveRun(threadId, runId){
	console.log('OpenAI Retrieve Run request :: Thread ID :: ', threadId, ' :: Run ID :: ', runId);
    const response = await fetch(`https://aiproxy.businesschain.io/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers
    });
    const resp = await response.json();
    
    return resp.status;
}

async function getMessages(threadId){
	console.log('OpenAI Retrieve Messages request :: Thread ID :: ', threadId);
    const response = await fetch(`https://aiproxy.businesschain.io/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers
    });
    const resp = await response.json();
    
    return resp;
}

let thread = {
	create: getNewThread,
    delete: deleteThread,
	ask: setNewMessage,
	run: runThread,
	status: retrieveRun,
	messages: getMessages
};
	
module.exports.thread = thread;