import { Label } from "@radix-ui/react-dropdown-menu";
import { SelectTrigger, SelectValue, SelectContent, SelectItem} from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

function FormControls({formControls=[],formData,setFormData}){
    function renderComponentByType(getControleItem){
        let element=null;
        const currentControlItemValue=formData[getControleItem.name] || ''

        switch(getControleItem.controleItem){
            case "input":
                element=<Input 
                id={getControleItem.name}
                name={getControleItem.name}
                placeholder={getControleItem.placeholder}
                type={getControleItem.type}
                value={currentControlItemValue}
                onChange={(event)=>setFormData({...formData,[getControleItem.name]:event.target.value})}
            />
            break;

            case "select":
                element=<select
                   onVallueChange={(value)=>setFormData({
                    ...formData,
                    [getControleItem.name]:value
                   })}
                   value={currentControlItemValue}
                   >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControleItem.label}/>
                    </SelectTrigger>
                    <SelectContent>
                        {getControleItem.options && getControleItem.options.length>0
                        ? getControleItem.options.map((optionItem)=>{
                            <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                        })
                        :null
                    }
                    </SelectContent>
                </select>
            break;

            case "textarea":
                element=<textarea
                   id={getControleItem.name}
                   name={getControleItem.name}
                   placeholder={getControleItem.placeholder}
                   value={currentControlItemValue}
                   onChange={(event)=>setFormData({...formData,[getControleItem.name]:event.target.value})}
            />
            break;

            default:
                element=<Input
                    id={getControleItem.name}
                    name={getControleItem.name}
                    placeholder={getControleItem.placeholder}
                    type={getControleItem.type}
                    value={currentControlItemValue}
                    onChange={(event)=>setFormData({...formData,[getControleItem.name]:event.target.value})}
                />
            break;
            
        }
        return element;
    }

    return (
        <div className="flex flex-col gap-3">
            {formControls.map(controleItem=>
                <div key={controleItem.name} >
                    <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
                    {
                        renderComponentByType(controleItem)
                    }
                </div>
            )}
        </div>
    )
}

export default FormControls