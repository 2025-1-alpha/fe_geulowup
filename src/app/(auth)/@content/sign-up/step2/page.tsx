import { Spacing } from '@/components/ui/Spacing';
import { Button } from '@/components/ui/Button';
import { RoleCard } from './_components/roleCard';

export default function Step2() {
  return (
    <section>
      <div className="title-lg flex whitespace-pre-line">
        {`님, 반갑습니다!
어떤 일을 하고 계신가요?`}
      </div>
      <Spacing size={64} />
      {/* TODO : 아이콘 넣을 수 있도록 변경하기 */}
      <div className="grid w-full grid-cols-2 gap-3">
        <RoleCard color="purple" icon="✏️" label="학생" />
        <RoleCard color="navy" icon="👔" label="직장인" />
        <RoleCard color="green" icon="👤" label="자영업자" />
        <RoleCard color="pink" icon="💬" label="기타" />
      </div>
      <Spacing size={40} />
      <div className="flex w-full justify-between">
        <Button size="small" state="line">
          건너뛰기
        </Button>
        <Button size="small">다음으로</Button>
      </div>
      <Spacing size={260} />
      {/* TODO : step bar 생성하기 */}
    </section>
  );
}
