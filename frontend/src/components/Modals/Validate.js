
function Validate(input, inputType)
{
    let failed = false;

    
    if(inputType === 'eMail')
    {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(input) === false)
        {
            //alert("email test: email not valid + " + input);
            return failed;
        }

        
    }

    if(input)
    {
        //alert("we got past the truthy");
        if(input.trim().length !==0)
        {
        //alert("we past the trimmy");
            if(input.trim().length === input.length)
            {

            }
            else
            {
                return failed;
            }
                
        }
        else
        {
            return failed;
        }
    }
    else
    {
        return failed;
    }

    return true;

}

export default Validate;