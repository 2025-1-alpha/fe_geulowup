import { deleteTemplate } from '@/services/template/deleteTemplate';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTemplate = () => {
    return useMutation({mutationFn : (templateId : number) => deleteTemplate(templateId)});
}