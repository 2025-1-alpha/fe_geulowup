import { postTemplateUse } from '@/services/template/postTemplateUse';
import { useMutation } from '@tanstack/react-query';

export const useTemplateUse = () => {
    return useMutation({mutationFn : (templateId : number) => postTemplateUse(templateId)});
}