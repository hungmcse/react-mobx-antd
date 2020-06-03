import * as React from "react";

export function UseEffect(p: { effect: React.EffectCallback, dependency?: any[]}) {
    React.useEffect(p.effect, p.dependency || []);
    return null;
}
