var mail = require('nodemailer');

let transport = mail.createTransport({
	service:'gmail',
	host:'smtp.gmail.com',
	secure:'true',
	port:'465',
	auth:{
		type:'OAuth2',
		user:'priyacse068@gmail.com',
		clientId:'441073532323-mh6kh2fkk1pc5gbnc82ok8ep4jvloaem.apps.googleusercontent.com',
		clientSecret:'YAqG5n0AkeQzQrsoyj5u5hSp',
		refreshToken:'1/TYGSAFyY4_ofjbYfwCNyAP3bwyESKmQlSVBuByhXG4pXSbeQt5Z42EUxbQ-zrkH4'
	}
});
var options={
	from:'priyacse068@gmail.com',
	to:'priyacse068@gmail.com',
	subject:'Message from NodeJS',
	text:'hello hi'
};

transport.sendMail(options,function(error,info){
if(error) console.log(error);
else {
console.log('info:'+info.response);
}
});

//YAqG5n0AkeQzQrsoyj5u5hSp