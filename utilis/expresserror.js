class expresserror extends error{
constructor(message,statusCode){
super();
this.message=message;
this.statusCode=statusCode;

}
}

module.exports=expresserror;