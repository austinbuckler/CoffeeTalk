Errors = new Mongo.Collection(null); // Local/Client only. This will never be sent to the server.

throwError = function(message) {
    Errors.insert({message:message});
}