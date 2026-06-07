import { cn } from '../utils';

describe('utils.ts', () => {
  describe('cn() helper', () => {
    it('merges standard class strings', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('resolves conflicting tailwind classes', () => {
      // p-4 should override p-2
      expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('handles conditional classes properly', () => {
      const isActive = true;
      const isDisabled = false;

      expect(
        cn(
          'base-class',
          isActive && 'active-class',
          isDisabled && 'disabled-class'
        )
      ).toBe('base-class active-class');
    });

    it('handles arrays and objects', () => {
      expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe(
        'class1 class2 class3'
      );
    });
  });
});
