
    function clearerror(){
        errors=document.getElementsByClassName("formerror");
        for(let item of errors)
        {
            item.innerHTML="";
        }
    }

    function seterror(id,error){
        element=document.getElementById(id);
        element.getElementsByClassName('formerror')[0].innerHTML=error;
        console.log(element);
    }

    function validateForm(){
        var returnval= true;
        clearerror();
        var email= document.forms['myform']['email'].value;
        var atposition =email.indexOf("@");
        var dotposition=email.lastIndexOf(".");
        if (atposition<1||dotposition<atposition+2||dotposition+2>=email.length){
            seterror("email","*Enter a valid email");
            returnval=false;
        }
        var password= document.forms['myform']['password'].value;
        if (password.length<9){
            seterror("pass","*password should be alleast 9 character long");
            returnval = false;
        }
        return returnval;
    }